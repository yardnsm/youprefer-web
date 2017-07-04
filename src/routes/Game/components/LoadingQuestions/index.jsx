import React from 'react';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const LoadingQuestions = () => (
  <div>
    <span>טוען...</span>
  </div>
);

export default injectSheet(styles)(LoadingQuestions);
