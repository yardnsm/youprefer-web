import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import reactRouterPropTypes from '../../prop-types/react-router';

import {
  pageNotFoundTitle,
  pageNotFoundButton,
} from '../../config/strings';

import Title from '../../components/Title';
import Button from '../../components/Button';

const Wrapper = styled.div`
  text-align: center;
`;

const BrokenQuestionMark = styled.div`
  width: 100%;
  max-height: 512px;
  height: 256px;
  background-image: url("assets/img/question_mark_broken.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

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
  ...reactRouterPropTypes,
};

export default NotFoundPage;
