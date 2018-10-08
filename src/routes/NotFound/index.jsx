import React from 'react';
import PropTypes from 'prop-types';

import {
  pageNotFoundTitle,
  pageNotFoundButton,
} from '../../config/strings';

import Title from '../../components/Title';
import Button from '../../components/Button';
import Wrapper from './components/Wrapper';
import BrokenQuestionMark from './components/BrokenQuestionMark';


const NotFoundPage = ({ history }) => (
  <Wrapper>
    <BrokenQuestionMark />

    <Title>{pageNotFoundTitle}</Title>

    <br />

    <Button
      text={pageNotFoundButton}
      handleClick={() => {
        history.push('/');
      }}
    />
  </Wrapper>
);

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default NotFoundPage;
