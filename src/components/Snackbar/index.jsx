import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SnackbarWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 50%;
  alignItems: center;
  justifyContent: flex-start;
  padding: 0 24px;
  backgroundColor: #323232;
  minWidth: 568px;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    transform: none;
  }

  & span {
    fontSize: 0.875rem;
    marginLeft: auto;
    marginRight: 0;
    height: 48px;
    display: flex;
    alignItems: center;
  }
`;

const Snackbar = ({ message, action }) => (
  <SnackbarWrapper>
    <span>{message}</span>

    {action.text && (
      <a onClick={action.callback} role="button" tabIndex={0}>
        {action.text}
      </a>
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

export default SnackbarWrapper;
