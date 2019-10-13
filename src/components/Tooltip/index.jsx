import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TooltipElem = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    content: "${props => props.text}";

    position: absolute;
    top: 0;
    left: 0;

    color: #ffffff;
    background-color: #616161;

    padding: 0 8px;
    border-radius: 2px;

    font-size: 10px;
    min-height: 22px;
    line-height: 22px;

    display: inline-block;

    opacity: 0;
    transform-origin: center right;
    transform: scale(0.95) translateX(-110%);

    will-change: opacity, transform;
    transition: opacity cubic-bezier(0.4, 0, 0.2, 1) 150ms,
      transform cubic-bezier(0.4, 0, 0.2, 1) 150ms;
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1) translateX(-110%);
  }
`;

const Tooltip = ({ children, text }) => (
  <TooltipElem text={text}>
    {children}
  </TooltipElem>
);

Tooltip.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

Tooltip.defaultProps = {
  text: '',
  children: null,
};

export default Tooltip;
