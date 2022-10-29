import { JSDOM } from 'jsdom';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import baseHTMLMarkup from '../dist/index.html';
import { unmask } from '../src/utils/mask';

admin.initializeApp();

function questionIdFromPath(pathname) {
  const questionIdRegex = /^\/(\d+)/;
  const result = questionIdRegex.exec(pathname);

  if (!result) {
    return null;
  }

  return unmask(result[1]);
}

async function fetchQuestion(questionId) {
  const snapshot = await admin.database().ref(`quest_packs/pack_1/quests/${questionId}`).get();

  if (!snapshot) {
    return null;
  }

  return snapshot.val();
}

function renderHTMLFromDocument(document) {
  return `<!DOCTYPE html>${document.documentElement.outerHTML}`;
}

function createOpenGraphData(question) {
  const { firstOption, secondOption } = question;


  return {
    'og:title': 'מה אתה מעדיף? - שאלה!',

    // Taken from ../src/config/strings.jsx
    'og:description': `מה אתה היית מעדיף? ${firstOption.value} או ${secondOption.value}? משחק השאלות המהנה והממכר שכולו העדפה - עכשיו בגרסת דפדפן!`,
  };
}

exports.renderQuestion = functions.https.onRequest(async (req, res) => {
  const questionId = questionIdFromPath(req.path);

  if (questionId === null) {
    res.status(200).send(baseHTMLMarkup);
    return;
  }

  const question = await fetchQuestion(questionId);

  if (question === null) {
    res.status(200).send(baseHTMLMarkup);
    return;
  }

  const { document } = (new JSDOM(baseHTMLMarkup)).window;

  // Update OpenGraph meta tags in the HTML
  Object
    .entries(createOpenGraphData(question))
    .forEach(([prop, value]) => {
      document.head.querySelector(`meta[property="${prop}"]`).setAttribute('content', value);
    });

  res.status(200).send(
    renderHTMLFromDocument(document),
  );
});
