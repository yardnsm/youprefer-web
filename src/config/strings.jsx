import React from 'react';

// App settings
export const appName = 'YouPrefer';
export const version = 'v0.1.7beta';
export const rootUrl = 'https://youprefer.co.il';
export const blankUrl = '/assets/html/ayyy.html';
export const serviceWorkerUrl = '/sw.js';

export const sendQuestionsEmail = 'support@youprefer.co.il';
export const sendQuestionsUrl = `mailto:${sendQuestionsEmail}`;

export const androidAppUrl = 'https://play.google.com/store/apps/details?id=com.yardnsm.youprefer';

export const singleQuestionUrl = questionId =>
  `${rootUrl}/${questionId}`;

// Plain strings
export const gameTitle = 'מה אתה מעדיף?';
export const connectedToServer = 'מחובר לשרת';
export const disconnectedFromServer = 'מנותק מהשרת';
export const dialogClose = 'סגור';

// Drawer stuff
export const drawerSendQuestions = 'הצע שאלות';
export const drawerGetTheApp = 'הורד את האפליקציה';
export const drawerAbout = 'אודות';

// About dialog
export const aboutDialogContents = () => (
  <p>
    <span>עיצוב, אפיון, קונספט ופיתוח ע&quot;י</span>&nbsp;
    <a href="http://yardnsm.net/" target="_blank" rel="noopener noreferrer">ירדן סוד-מוריה</a>.&nbsp;
    <span>מטרת המשחק היא לבידור בלבד ואין במטרה לפגוע באף אחד.</span>
  </p>
);

// Share dialog
export const shareDialogTitle = 'שתף שאלה';

export const shareText = (firstOption, secondOption) =>
  `מה אתה היית מעדיף? ${firstOption} או ${secondOption}? היכנס עכשיו לאתר והתחל לשחק!`;

export const shareDialogButtons = [{
  name: 'Facebook',
  bgColor: '#314E8F',
  text: 'שתף בפייסבוק',
  urlTemplate: 'https://facebook.com/sharer/sharer.php?u=$url',
  iconUrl: '/assets/img/icon_facebook.svg',
}, {
  name: 'Twitter',
  bgColor: '#4AA4EC',
  text: 'שתף בטוויטר',
  urlTemplate: 'https://twitter.com/intent/tweet/?text=$content&amp;url=$url',
  iconUrl: '/assets/img/icon_twitter.svg',
}, {
  name: 'Google+',
  bgColor: '#D84337',
  text: 'שתף ב-Google+',
  urlTemplate: 'https://plus.google.com/share?url=$url',
  iconUrl: '/assets/img/icon_gplus.svg',
}, {
  name: 'Email',
  bgColor: '#6C6C6C',
  text: 'שלח באימייל',
  urlTemplate: 'mailto:?subject=$content&amp;body=$url',
  iconUrl: '/assets/img/icon_email.svg',
}, {
  name: 'WhatsApp',
  bgColor: '#21CD5B',
  text: 'שתף בווטסאפ',
  urlTemplate: 'whatsapp://send?text=$content%20$url',
  iconUrl: '/assets/img/icon_whatsapp.svg',
}, {
  name: 'Telegram',
  bgColor: '#4A9FE8',
  text: 'שתף בטלגרם',
  urlTemplate: 'https://telegram.me/share/url?text=$content&amp;url=$url',
  iconUrl: '/assets/img/icon_telegram.svg',
}];

// Navigation buttons
export const navigationButtonsPrev = 'אחורה';
export const navigationButtonsNext = 'קדימה';

// Option card
export const optionCardVotes = 'הצבעות';

// Or circle
export const orCircleValue = 'או';

// Question stats
export const questionStatsVotes = 'הצבעות';

// Not found page
export const pageNotFoundTitle = 'הדף שביקשת איננו קיים!';
export const pageNotFoundButton = 'לדף הבית';

// Loading questions
export const loadingQuestionsText = 'טוען שאלה...';
