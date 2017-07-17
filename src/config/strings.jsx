import React from 'react';

export const appName = 'YouPrefer';
export const version = '0.0.1';
export const rootUrl = 'https://youprefer.co.il';
export const blankUrl = '/ayyy.html';

export const sendQuestionsEmail = 'support@youprefer.co.il';
export const sendQuestionsUrl = `mailto:${sendQuestionsEmail}`;

export const androidAppUrl = 'https://play.google.com/store/apps/details?id=com.yardnsm.youprefer';

export const singleQuestionUrl = (questionId) =>
  `${rootUrl}/${questionId}`;

// Plain strings...
export const gameTitle = 'מה אתה מעדיף?';
export const dialogClose = 'סגור';

// Drawer stuff
export const drawerSendQuestions = 'הצע שאלות';
export const drawerGetTheApp = 'הורד את האפליקציה';
export const drawerAbout = 'אודות';

// About dialog
export const aboutDialogContents = () => (
  <p>
    <span>עיצוב, אפיון, קונספט ופיתוח ע"י</span>&nbsp;
    <a href="http://yardnsm.net/" target="_blank">ירדן סוד-מוריה</a>.&nbsp;
    <span>מטרת המשחק היא לבידור בלבד ואין במטרה לפגוע באף אחד.</span>
  </p>
);

// Share dialog
export const shareDialogTitle = 'שתף שאלה';

export const shareText = (firstOption, secondOption) =>
  `מה אתה היית מעדיף? ${firstOption} או ${secondOption}? הורד עכשיו את האפליקציה בחנות האפליקציות! ${rootUrl}`;

export const shareButtonsUrl = (questionId, firstOption, secondOption) =>
  `/share-buttons.html?questionId=${questionId}&text=${shareText(firstOption, secondOption)}`;

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