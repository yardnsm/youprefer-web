import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overlay from '../Overlay';

const Wrapper = styled.aside`
  position: fixed;
  top: ${props => (props.forceFullscreen ? '0' : '64px')};
  left: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;
  z-index: 8;

  box-sizing: border-box;
  pointer-events: ${props => (props.toggled ? 'auto' : 'none')};

  contain: strict;

  @media (max-width: 768px) {
    top: 0;
    z-index: 9;
  }
`;

const Inner = styled.div`
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;

  background: #ffffff;

  display: flex;
  flex-direction: column;
  touch-action: none;

  will-change: transform;
  transition: transform cubic-bezier(0, 0, .2, 1) 350ms;

  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
              0px 16px 24px 2px rgba(0, 0, 0, 0.14),
              0px 6px 30px 5px rgba(0, 0, 0, 0.12);
`;

const RightInner = styled(Inner)`
  right: 0;

  height: 100%;
  width: calc(100% - 56px);
  max-width: 280px;

  transform: ${props => (props.visible ? 'none' : 'translateX(100%)')}
`;

const BottomInner = styled(Inner)`
  bottom: 0;
  left: 50%; /* Keep it at center */

  width: 100%;
  max-width: 568px;

  transform: translateX(-50%) ${props => !props.visible && 'translateY(100%)'}
`;

const Drawer = ({
  children,
  open,
  onDrawerClose,
  position,
}) => {
  const InnerComponent = position === 'bottom' ? BottomInner : RightInner;

  return (
    <Wrapper toggled={open} forceFullscreen={position === 'bottom'}>
      <Overlay visible={open} onClick={onDrawerClose} />

      <InnerComponent visible={open} position={position}>
        { children }
      </InnerComponent>
    </Wrapper>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onDrawerClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['right', 'bottom']),
};

Drawer.defaultProps = {
  open: false,
  position: 'right',
};

export default Drawer;
