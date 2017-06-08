import React from 'react';
import injectSheet from 'jss-inject-sheet';
import styles from './styles';

const LoadingQuestions = ({ classes }) =>
  <div>
    <span>טוען...</span>
  </div>;

export default injectSheet(styles)(LoadingQuestions);