import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rippleAnim = keyframes`
  0% {
    transform: scale(0.25);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(2);
  }
`;

const RippleInk = styled.span`
  position: absolute;
  background: ${props => props.rippleColor};
  width: ${props => props.dim}px;
  height: ${props => props.dim}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: -1;
  border-radius: 50%;
  transform: scale(2);
  opacity: 1;
  animation: ${rippleAnim} 600ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Releaser = styled.span`
  transition: opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1);

  /*
   * The initial opacity of the ripple is 1. When the ripple will be
   * "released", the opacity will be set to 0 and the transition will kick in
   */
  opacity: ${props => Number(!props.released)};
`;

const Ripple = ({
  dim, x, y, rippleColor, released,
}) => (
  <Releaser released={released}>
    <RippleInk
      dim={dim}
      left={x}
      top={y}
      rippleColor={rippleColor}
    />
  </Releaser>
);

Ripple.propTypes = {
  dim: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  rippleColor: PropTypes.string.isRequired,
  released: PropTypes.bool.isRequired,
};

export default Ripple;
