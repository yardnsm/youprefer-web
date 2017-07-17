import React from 'react';
import styled from 'styled-components';

import {
  loadingQuestionsText,
} from '../../../../config/strings';

const Wrapper = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const LoadingQuestions = () => (
  <Wrapper>
    <span>{loadingQuestionsText}</span>
  </Wrapper>
);

export default LoadingQuestions;
