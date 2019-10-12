import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const generateTransformForDrawer = (props) => {
  if (props.visible) {
    if (props.position === 'bottom') {
      return 'translateX(-50%)';
    }

    return 'none';
  }

  if (props.position === 'bottom') {
    return 'translateX(-50%) translateY(100%)';
  }

  return 'translateX(100%)';
};

const DrawerWrapper = styled.aside`
  position: fixed;
  top: ${props => (props.forceFullscreen ? '0' : '64px')};
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: ${props => (props.toggled ? 'auto' : 'none')};
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
  will-change: transform;
  display: flex;
  position: absolute;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: none;
  transition: transform cubic-bezier(0, 0, .2, 1) 350ms;

  ${props => (props.position === 'right' && `
    right: 0;
    height: 100%;
    max-width: 280px;
    width: calc(100% - 56px);
  `)}

  ${props => (props.position === 'bottom' && `
    bottom: 0;
    width: 100%;
    max-width: 568px;

    /* Keep it at center */
    left: 50%;
  `)}

  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
              0px 16px 24px 2px rgba(0, 0, 0, 0.14),
              0px 6px 30px 5px rgba(0, 0, 0, 0.12);

  transform: ${generateTransformForDrawer};
`;

const Drawer = ({
  children,
  open,
  handleDrawerClose,
  position,
}) => (
  <DrawerWrapper toggled={open} forceFullscreen={position === 'bottom'}>
    <DrawerOverlay toggled={open} onClick={handleDrawerClose} />

    <DrawerInner visible={open} position={position}>
      { children }
    </DrawerInner>
  </DrawerWrapper>
);

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['right', 'bottom']),
};

Drawer.defaultProps = {
  open: false,
  position: 'right',
};

export default Drawer;
