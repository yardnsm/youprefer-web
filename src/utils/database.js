import * as idb from 'idb';
import firebase from '../config/firebase';
import {
  indexedDBName,
  indexedDBVersion,
  indexedDBQuestionsStore,
  indexedDBTransactionsStore,
} from '../config/strings';

import { runWithTimeout } from './delay';

const wrap = p => runWithTimeout(p, 5000);

const RealtimeDatabase = {
  fetchQuestionCount: () => wrap(
    firebase.database()
      .ref('quest_packs/pack_1/count')
      .once('value')
      .then(snapshot => snapshot.val()),
  ),

  fetchSingleQuestion: id => wrap(
    firebase.database()
      .ref(`quest_packs/pack_1/quests/${id}`)
      .once('value')
      .then(snapshot => snapshot.val()),
  ),

  fetchMultipleQuestionsFrom: startAt => firebase.database()
    .ref('quest_packs/pack_1/quests')
    .orderByKey()
    .startAt(startAt.toString())
    .once('value')
    .then(snapshot => snapshot.val()),

  incrementQuestionVotes: (questionId, optionField) => firebase.database()
    .ref(`quest_packs/pack_1/quests/${questionId}/${optionField}/votes`)
    .transaction(votes => votes + 1),
};


class Database {
  db = null;

  shouldUseOfflineStrategy = false;

  createDatabase = () =>
    idb.openDB(indexedDBName, indexedDBVersion, {
      upgrade: (db) => {
        db.createObjectStore(indexedDBQuestionsStore, { unique: true });
        db.createObjectStore(indexedDBTransactionsStore, { unique: true });
      },
    });

  setOffline(isOffline) {
    this.shouldUseOfflineStrategy = isOffline;
  }

  async getDatabase() {
    if (this.db) {
      return this.db;
    }

    this.db = await this.createDatabase();
    return this.db;
  }

  async syncQuestions() {
    const localCount = await this.getQuestionsCount(true);
    const remoteCount = await RealtimeDatabase.fetchQuestionCount();

    // Sync only if the remote count is bigger
    if (remoteCount <= localCount) {
      return 0;
    }

    const questions = await RealtimeDatabase.fetchMultipleQuestionsFrom(localCount);

    return Promise.all(
      Object.entries(questions).map(([key, value]) => this.setQuestion(key, value)),
    ).then(fulfilled => fulfilled.length);
  }

  async syncTransactions() {
    if (this.shouldUseOfflineStrategy) {
      return 0;
    }

    const transactions = await this.getTransactions();

    const fullfilled = await Promise.all(
      Object.entries(transactions).map(
        ([questionId, optionField]) => this.incrementVotes(questionId, optionField),
      ),
    );

    await this.clearTransactions();

    return fullfilled.length;
  }

  async getQuestionsCount(forceLocal = false) {
    const localCount = await (await this.getDatabase()).count(indexedDBQuestionsStore);

    if (forceLocal) {
      return localCount;
    }

    if (localCount === 0) {
      const remoteCount = RealtimeDatabase.fetchQuestionCount();

      if (!remoteCount) {
        // Just retry
        return this.getQuestionsCount();
      }
    }

    return localCount;
  }

  async isQuestionSet(questionId) {
    return this.getDatabase()
      .then(db => db.get(indexedDBQuestionsStore, questionId.toString()))
      .then(question => !!question);
  }

  async getQuestion(id, forceLocal = false) {
    if (!this.shouldUseOfflineStrategy && !forceLocal) {
      const freshQuestion = await RealtimeDatabase.fetchSingleQuestion(id);

      // No question? Fallback to the local db!
      if (!freshQuestion) {
        return this.getQuestion(id, true);
      }

      // Update the question if needed
      if (await this.isQuestionSet(id)) {
        await this.setQuestion(id, freshQuestion);
      }

      return freshQuestion;
    }

    let question = await (await this.getDatabase()).get(
      indexedDBQuestionsStore,
      id.toString(),
    );

    if (question) {
      return question;
    }

    // Fallback to firebase
    question = await RealtimeDatabase.fetchSingleQuestion(id);

    // Just retry
    if (!question) {
      return this.getQuestion(id);
    }

    return question;
  }

  async setQuestion(questionId, question) {
    return (await this.getDatabase()).put(
      indexedDBQuestionsStore,
      question,
      questionId.toString(),
    );
  }

  async getTransactions() {
    return (await this.getDatabase()).getAll(indexedDBTransactionsStore);
  }

  async clearTransactions() {
    return (await this.getDatabase()).clear(indexedDBTransactionsStore);
  }

  async setTransaction(questionId, optionField) {
    return (await this.getDatabase()).put(
      indexedDBTransactionsStore,
      optionField,
      questionId.toString(),
    );
  }

  async incrementVotes(questionId, optionField) {
    if (!this.shouldUseOfflineStrategy) {
      return RealtimeDatabase.incrementQuestionVotes(
        questionId,
        optionField,
      );
    }

    return this.setTransaction(questionId, optionField);
  }
}

export default new Database();
