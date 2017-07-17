import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DrawerWrapper = styled.aside`
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: ${props => props.toggled ? 'auto' : 'none'};
  box-sizing: border-box;
  contain: strict;
  z-index: 8;

  @media (max-width: 768px) {
    top: 0;
    z-index: 9;
  }
`;

const DrawerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  will-change: opacity;
  transition: opacity cubic-bezier(0, 0, 0.2, 1) 350ms;

  opacity: ${props => Number(!!props.toggled)};
`;

const DrawerInner = styled.div`
  background: #ffffff;
  right: 0;
  height: 100%;
  will-change: transform;
  display: flex;
  position: absolute;
  flex-direction: column;
  width: calc(100% - 56px);
  max-width: 280px;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: none;
  transition: transform cubic-bezier(0, 0, .2, 1) 350ms;

  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
              0px 16px 24px 2px rgba(0, 0, 0, 0.14),
              0px 6px 30px 5px rgba(0, 0, 0, 0.12);

  transform: ${props => props.visible ? 'none' : 'translateX(100%)'};
`;

const Drawer = ({ children, open, handleDrawerClose }) => (
  <DrawerWrapper toggled={open}>
    <DrawerOverlay toggled={open} onClick={handleDrawerClose} />

    <DrawerInner visible={open}>
      { children }
    </DrawerInner>
  </DrawerWrapper>
);

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func.isRequired,
};

Drawer.defaultProps = {
  open: false,
};

export default Drawer;