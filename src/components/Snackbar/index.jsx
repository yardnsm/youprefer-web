import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Button from '../Button';

const snackbarEnterAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 100%);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const snackbarEnterAnimationMobile = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  position: fixed;
  bottom: 0;
  left: 50%;

  padding: 0 24px;

  min-width: 568px;
  transform: translateX(-50%);

  background-color: #323232;

  animation: ${snackbarEnterAnimation} 200ms cubic-bezier(0, 0, .2, 1);

  /* Full width on mobile */
  @media (max-width: 768px) {
    left: 0;
    right: 0;

    min-width: auto;
    transform: none;

    animation: ${snackbarEnterAnimationMobile} 200ms cubic-bezier(0, 0, .2, 1);
  }

  & span {
    display: flex;
    align-items: center;

    margin-left: auto;
    margin-right: 0;

    font-size: 0.875rem;
    height: 48px;
  }
`;

const Snackbar = ({ message, action }) => (
  <Wrapper>
    <span>{message}</span>

    {action.text && (
      <Button onClick={action.callback} compact>
        {action.text}
      </Button>
    )}
  </Wrapper>
);

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.shape({
    text: PropTypes.string,
    callback: PropTypes.func,
  }),
};

Snackbar.defaultProps = {
  action: {},
};

export default Snackbar;
