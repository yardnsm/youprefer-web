/* eslint-disable no-console */

import { serviceWorkerUrl } from './config/strings';

export const register = ({ onInstall }) => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(serviceWorkerUrl)
        .then((registration) => {
          console.log('Service worker registered with scope', registration.scope);

          // Call the `onInstall` when finished
          if (registration.installing) {
            registration.installing.addEventListener('statechange', (e) => {
              if (e.currentTarget.state === 'activated' && onInstall) {
                onInstall(registration);
              }
            });
          }
        }).catch((err) => {
          console.error('Error during service worker registration:', err);
        });
    });
  }
};

export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};
