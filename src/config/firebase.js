import firebase from 'firebase/app';
import 'firebase/database';

// The firebase config is in that file. Good luck dudes.
import config from './app-config';

firebase.initializeApp(config.firebase);
export default firebase;
