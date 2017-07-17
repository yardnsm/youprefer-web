import React from 'react';
import styled from 'styled-components';

import {
  rootUrl,
  pageNotFoundTitle,
  pageNotFoundButton,
} from '../../config/strings';

import Title from '../../components/Title';
import FlatButton from '../../components/FlatButton';
import Wrapper from './components/Wrapper';
import BrokenQuestionMark from './components/BrokenQuestionMark';


const NotFoundPage = ({ history }) => (
  <Wrapper>
    <BrokenQuestionMark />

    <Title>{pageNotFoundTitle}</Title>

    <br />
    
    <FlatButton
      text={pageNotFoundButton}
      handleClick={() => {
        history.push('/');
      }}
    />
  </Wrapper>
);

export default NotFoundPage;