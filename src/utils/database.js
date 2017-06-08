import firebase from '../config/firebase';

const fetchSingleQuestion = id =>
  firebase.database()
    .ref(`quest_packs/pack_1/quests/${id}`)
    .once('value')
    .then(snapshot => snapshot.val());

const incrementQuestionVotes = ({ id, payload }, optionField) =>
  firebase.database()
    .ref(`quest_packs/pack_1/quests/${id}/${optionField}`)
    .update({
      votes: payload[optionField].votes + 1,
    });

export { fetchSingleQuestion, incrementQuestionVotes };
