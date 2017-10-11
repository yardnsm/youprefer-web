import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Button from '../Button';

const snackbarEnterAnim = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const snackbarEnterAnimMobile = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SnackbarWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 50%;
  align-items: center;
  justify-content: flex-start;
  padding: 0 24px;
  background-color: #323232;
  min-width: 568px;
  transform: translateX(-50%);

  animation: ${snackbarEnterAnim} 200ms cubic-bezier(0, 0, .2, 1);

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    min-width: auto;
    transform: none;

    animation: ${snackbarEnterAnimMobile} 200ms cubic-bezier(0, 0, .2, 1);
  }

  & span {
    font-size: 0.875rem;
    margin-left: auto;
    margin-right: 0;
    height: 48px;
    display: flex;
    align-items: center;
  }
`;

const Snackbar = ({ message, action }) => (
  <SnackbarWrapper>
    <span>{message}</span>

    {action.text && (
      <Button
        text={action.text}
        handleClick={action.callback}
        compact
      />
    )}
  </SnackbarWrapper>
);

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.shape({
    text: PropTypes.string,
    callback: PropTypes.func,
  }).isRequired,
};

export default Snackbar;
