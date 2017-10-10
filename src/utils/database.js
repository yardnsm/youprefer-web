import firebase from '../config/firebase';

const fetchQuestionCount = () =>
  firebase.database()
    .ref('quest_packs/pack_1/count')
    .once('value')
    .then(snapshot => snapshot.val());

const fetchSingleQuestion = id =>
  firebase.database()
    .ref(`quest_packs/pack_1/quests/${id}`)
    .once('value')
    .then(snapshot => snapshot.val());

const incrementQuestionVotes = ({ id, payload }, optionField) =>
  firebase.database()
    .ref(`quest_packs/pack_1/quests/${id}/${optionField}/votes`)
    .transaction(votes => votes + 1);

export { fetchQuestionCount, fetchSingleQuestion, incrementQuestionVotes };
