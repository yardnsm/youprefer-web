import React, { useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Overlay from '../Overlay';

const TOLERANCE = 70;

const Wrapper = styled.aside`
  position: fixed;
  top: ${props => (props.forceFullscreen ? '0' : '64px')};
  right: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;
  z-index: ${props => props.zIndex};

  box-sizing: border-box;
  pointer-events: ${props => (props.toggled ? 'auto' : 'none')};

  contain: strict;

  @media (max-width: 768px) {
    top: 0;
    z-index: 9;
  }
`;

const Puller = styled.div`
  pointer-events: all;
  touch-action: none;

  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 16px;
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
  onDrawerOpen,
  onDrawerClose,
  position,
  zIndex,
}) => {
  const isSideDrawer = position === 'right';
  const InnerComponent = isSideDrawer ? RightInner : BottomInner;

  const innerRef = useRef(null);

  const [dimension, setDimension] = useState(0);
  const [opening, setOpening] = useState(false);
  const [moved, setMoved] = useState(false);
  const [startOffest, setStartOffset] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);

  const translate = !open ?
    currentOffset + dimension :
    currentOffset;

  const innerStyle = moved ? {
    transition: 'none',
    transform: isSideDrawer ?
      `translateX(${translate}px)` :
      `translateY(${translate}px) translateX(-50%)`,
  } : {};

  const overlayStyle = moved ? {
    transition: 'none',
    opacity: 1 - Math.min(
      1,
      translate / dimension,
    ),
  } : {};

  useLayoutEffect(() => {
    if (innerRef.current) {
      setDimension(isSideDrawer ? innerRef.current.clientWidth : innerRef.current.clientHeight);
    }
  }, [startOffest, position, innerRef.current]);

  const handleTouchStart = (e) => {
    if (typeof e.touches === 'undefined') {
      return;
    }

    setOpening(false);
    setMoved(false);

    setStartOffset(isSideDrawer ? e.touches[0].pageX : e.touches[0].pageY);
  };

  const handleTouchMove = (e) => {
    if (typeof e.touches === 'undefined') {
      return;
    }

    const diff = ((isSideDrawer ? e.touches[0].pageX : e.touches[0].pageY) - startOffest);

    // Multiplying by -1 since we're dealing with a right drawer, or a bottom one
    const orientedDiff = diff * -1;

    if (Math.abs(diff) > dimension) {
      return;
    }

    // Diff < 0, it's closing
    // Diff > 0, it's opening
    setOpening(orientedDiff > 0);

    // Drawer is far from open / from close state
    if ((open && orientedDiff > 0) || (!open && orientedDiff < 0)) {
      return;
    }

    setCurrentOffset(diff);
    setMoved(true);
  };

  const handleTouchEnd = () => {
    if (moved) {
      if (opening && Math.abs(currentOffset) > TOLERANCE) {
        onDrawerOpen();
      } else if (!opening && Math.abs(currentOffset) > TOLERANCE) {
        onDrawerClose();
      }
    }

    setMoved(false);
  };

  const handleTouchCancel = () => {
    setOpening(false);
    setMoved(false);
  };

  return (
    <Wrapper
      toggled={open || moved}
      forceFullscreen={!isSideDrawer}
      zIndex={zIndex}

      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {isSideDrawer && (
        <Puller onTouchStart={handleTouchStart} />
      )}

      <Overlay visible={open} onClick={onDrawerClose} style={overlayStyle} />

      <InnerComponent visible={open} position={position} ref={innerRef} style={innerStyle}>
        { children }
      </InnerComponent>
    </Wrapper>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onDrawerOpen: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['right', 'bottom']),
  zIndex: PropTypes.number,
};

Drawer.defaultProps = {
  open: false,
  position: 'right',
  zIndex: 8,
};

export default Drawer;
