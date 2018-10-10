import firebase from '../config/firebase';

const attachConnectionListener = listener => firebase.database()
  .ref('.info/connected')
  .on('value', (snapshot) => {
    listener(snapshot.val());
  });

const dettachConnectionListeners = () => firebase.database()
  .ref('.info/connected')
  .off();

export { attachConnectionListener, dettachConnectionListeners };
