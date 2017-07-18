import React from 'react';
import PropTypes from 'prop-types';

import {
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

NotFoundPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NotFoundPage;
