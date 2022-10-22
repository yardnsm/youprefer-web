import { onValue, ref } from 'firebase/database';
import { database } from '../config/firebase';

class ConnectionListener {
  listeners = [];

  ref = null

  unsubscribe = null;

  onValue = (snapshot) => {
    this.listeners.forEach(fn => fn(snapshot.val()));
  }

  constructor() {
    this.ref = ref(database, '.info/connected');
    this.unsubscribe = onValue(this.ref, this.onValue);
  }

  attach(fn) {
    this.listeners.push(fn);
  }

  detach(fn) {
    this.listeners = this.listeners.filter(listener => listener !== fn);
  }

  detachAll() {
    this.listeners = [];
  }
}

const connectionListener = new ConnectionListener();

const attachConnectionListener = listener =>
  connectionListener.attach(listener);

const dettachConnectionListeners = () =>
  connectionListener.detachAll();

export { attachConnectionListener, dettachConnectionListeners };
