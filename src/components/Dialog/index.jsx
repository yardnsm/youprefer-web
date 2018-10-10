import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  contain: strict;
  z-index: 99;
  will-change: opacity;
  transition: opacity cubic-bezier(0, 0, 0.2, 1) 350ms;

  pointer-events: ${props => (props.toggled ? 'auto' : 'none')};
  opacity: ${props => Number(!!props.toggled)};
`;

const DialogOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const DialogInner = styled.div`
  max-width: 600px;
  flex: 0 1 auto;
  display: flex;
  position: relative;
  overflow: hidden;
  max-height: 90vh;
  flex-direction: column;
  border-radius: 2px;
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
              0px 24px 38px 3px rgba(0, 0, 0, 0.14),
              0px 9px 46px 8px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const Dialog = ({ children, open, handleDialogClose }) => (
  <DialogWrapper toggled={open}>
    <DialogOverlay onClick={handleDialogClose} />
    <DialogInner>
      { children }
    </DialogInner>
  </DialogWrapper>
);

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
  open: false,
};

export default Dialog;
