import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rippleAnim = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 0;
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
  transform: scale(1);
  opacity: 0;
  animation: ${rippleAnim} 550ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const Ripple = ({
  dim, x, y, rippleColor,
}) => (
  <RippleInk dim={dim} left={x} top={y} rippleColor={rippleColor} />
);

Ripple.propTypes = {
  dim: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  rippleColor: PropTypes.string.isRequired,
};

export default Ripple;
