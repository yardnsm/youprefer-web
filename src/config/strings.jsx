import React from 'react';
import Icon from '../components/Icon';
import config from './app-config';

// Config exports
export const {
  rootUrl,
  version,
  androidAppUrl,
} = config;

export const sendQuestionsUrl = `mailto:${config.supportEmail}`;

export const singleQuestionUrl = questionId =>
  `${rootUrl}/${questionId}`;

// Local IndexedDB Configs
export const indexedDBName = 'youprefer';
export const indexedDBVersion = 1;
export const indexedDBQuestionsStore = 'questions';
export const indexedDBTransactionsStore = 'transactions';
export const indexedDBMetadataStore = 'metadata';

// Plain strings
export const gameTitle = 'מה אתה מעדיף?';
export const questionsSynced = ' שאלות נשמרו לשימוש במצב לא מקוון';
export const transactionsSynced = ' הצבעות סונכרנו עם השרת';

// General snackbars
export const readyForOfflineSnackbar = 'מוכן לשימוש במצב לא מקוון';
export const questionNotFoundSnackbar = 'השאלה שביקשת לא נמצאה, מחפש שאלה חדשה';

// Dialog stuff
export const dialogClose = 'סגור';

// Connection status
export const connectedToServer = 'מחובר לשרת';
export const disconnectedFromServer = 'מנותק מהשרת';

// Drawer stuff
export const drawerSendQuestions = 'הצע שאלות';
export const drawerGetTheApp = 'הורד את האפליקציה';
export const drawerAbout = 'אודות';

// About dialog
export const aboutDialogContents = () => (
  <p>
    <span>עיצוב, אפיון, קונספט ופיתוח ע&quot;י</span>
    &nbsp;

    <a href="http://yardnsm.net/" target="_blank" rel="noopener noreferrer">ירדן סוד-מוריה</a>
    .&nbsp;

    <span>מטרת המשחק היא לבידור בלבד ואין במטרה לפגוע באף אחד.</span>
  </p>
);

// Share dialog
export const shareDialogTitle = 'שתף שאלה';
export const shareTitle = 'מה אתה מעדיף?';
export const shareText = (firstOption, secondOption) =>
  `מה אתה היית מעדיף? ${firstOption} או ${secondOption}? היכנס עכשיו לאתר והתחל לשחק!`;

export const shareDialogButtons = [{
  name: 'Facebook',
  color: '#227AEE',
  urlTemplate: 'https://facebook.com/sharer/sharer.php?u=$url',
  icon: '/assets/img/icon_facebook.svg',
}, {
  name: 'Twitter',
  color: '#2AA3F0',
  urlTemplate: 'https://twitter.com/intent/tweet/?text=$content&amp;url=$url',
  icon: '/assets/img/icon_twitter.svg',
}, {
  name: 'Email',
  color: '#f4f4f4',
  urlTemplate: 'mailto:?subject=$content&amp;body=$url',
  icon: (
    <Icon>email</Icon>
  ),
}, {
  name: 'WhatsApp',
  color: '#25D366',
  urlTemplate: 'whatsapp://send?text=$content%20$url',
  icon: '/assets/img/icon_whatsapp.svg',
}, {
  name: 'Telegram',
  color: '#4A9FE8',
  urlTemplate: 'https://telegram.me/share/url?text=$content&amp;url=$url',
  icon: '/assets/img/icon_telegram.svg',
}];

// Navigation buttons
export const navigationButtonsPrev = 'אחורה';
export const navigationButtonsNext = 'קדימה';

// Option card
export const optionCardVotes = 'הצבעות';

// Or circle
export const orCircleValue = 'או';

// Question stats
export const questionStatsLoadingVotes = 'טוען הצבעות';
export const questionStatsVotes = 'הצבעות';

// Copy to clipboard text
export const clickToCopy = 'לחץ להעתקה';
export const copiedToClipboard = 'הועתק ללוח';
