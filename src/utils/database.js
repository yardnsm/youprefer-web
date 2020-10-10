import * as idb from 'idb';
import firebase from '../config/firebase';
import {
  indexedDBName,
  indexedDBVersion,
  indexedDBQuestionsStore,
  indexedDBTransactionsStore,
} from '../config/strings';

const fetchQuestionCount = () => firebase.database()
  .ref('quest_packs/pack_1/count')
  .once('value')
  .then(snapshot => snapshot.val());

const fetchSingleQuestion = id => firebase.database()
  .ref(`quest_packs/pack_1/quests/${id}`)
  .once('value')
  .then(snapshot => snapshot.val());

const fetchMultipleQuestionsFrom = startAt => firebase.database()
  .ref('quest_packs/pack_1/quests')
  .orderByKey()
  .startAt(startAt.toString())
  .once('value');

const incrementQuestionVotes = ({ id }, optionField) => firebase.database()
  .ref(`quest_packs/pack_1/quests/${id}/${optionField}/votes`)
  .transaction(votes => votes + 1);

class Database {
  indexedDB = null;

  createDatabase = () =>
    idb.openDB(indexedDBName, indexedDBVersion, {
      upgrade: (db) => {
        db.createObjectStore(indexedDBQuestionsStore, { unique: true });
        db.createObjectStore(indexedDBTransactionsStore, { unique: true });
      },
    });

  async getDatabase() {
    if (this.indexedDB) {
      return this.indexedDB;
    }

    this.indexedDB = await this.createDatabase();
    return this.indexedDB;
  }

  async getQuestionsCount(forceLocal = false) {
    const localCount = await (await this.getDatabase()).count(indexedDBQuestionsStore);

    if (!forceLocal && localCount === 0) {
      return fetchQuestionCount();
    }

    return localCount;
  }

  async getTransactionsCount() {
    return (await this.getDatabase()).count(indexedDBTransactionsStore);
  }

  async syncQuestions() {
    const localCount = await this.getQuestionsCount(true);
    const remoteCount = await fetchQuestionCount();

    // Sync only if the remote count is bigger
    if (remoteCount <= localCount) {
      return 0;
    }

    const questions = (await fetchMultipleQuestionsFrom(localCount)).val();

    return Promise.all(
      Object.entries(questions).map(([key, value]) => this.setQuestion(key, value)),
    ).then(fulfilled => fulfilled.length);
  }

  async syncTransactions() {
    return this.getTransactionsCount();
  }

  async getQuestion(id) {
    const question = await (await this.getDatabase()).get(
      indexedDBQuestionsStore,
      id,
    );

    if (question) {
      return question;
    }

    // Fallback to firebase
    return fetchSingleQuestion(id);
  }

  async setQuestion(questionId, question) {
    return (await this.getDatabase()).add(
      indexedDBQuestionsStore,
      question,
      questionId,
    );
  }

  async setTransaction(questionId, optionField) {
    return (await this.getDatabase()).add(
      indexedDBTransactionsStore,
      optionField,
      questionId,
    );
  }

  async incrementVotes(question, optionField) {
    // Try firebase, fallback to offline store for later sync
    incrementQuestionVotes(
      question,
      optionField,
    ).catch(() => this.setTransaction(question.id, optionField));
  }
}

export default new Database();
