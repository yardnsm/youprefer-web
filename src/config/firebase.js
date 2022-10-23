import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// The firebase config is in that file. Good luck dudes.
import config from './app-config';

const firebase = initializeApp(config.firebase);
const database = getDatabase(firebase);

export { database };
export default firebase;
