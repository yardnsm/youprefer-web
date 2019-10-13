import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overlay from '../Overlay';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  z-index: 99;

  contain: strict;
  will-change: opacity;
  transition: opacity cubic-bezier(0, 0, 0.2, 1) 350ms;

  pointer-events: ${props => (props.toggled ? 'auto' : 'none')};
  opacity: ${props => Number(!!props.toggled)};
`;

const Inner = styled.div`
  position: relative;

  display: flex;
  flex: 0 1 auto;
  overflow: hidden;
  flex-direction: column;

  border-radius: 2px;

  max-width: 600px;
  max-height: 90vh;

  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.87);

  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
              0px 24px 38px 3px rgba(0, 0, 0, 0.14),
              0px 9px 46px 8px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const Dialog = ({ children, open, onDialogClose }) => (
  <Wrapper toggled={open}>
    <Overlay onClick={onDialogClose} />

    <Inner>
      { children }
    </Inner>
  </Wrapper>
);

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onDialogClose: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  open: false,
};

export default Dialog;
