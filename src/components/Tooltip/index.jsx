import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TooltipElem = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    color: #ffffff;
    padding: 0 8px;
    background: #616161;
    border-radius: 2px;
    content: "${props => props.text}";
    display: inline-block;
    font-size: 10px;
    min-height: 22px;
    line-height: 22px;

    position: absolute;
    top: 0;
    left: 0;

    will-change: opacity, transform;
    transition: opacity, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    transform-origin: center right;
    transform: scale(0) translateX(-110%);
  }

  &:hover::after {
    transform: scale(1) translateX(-110%);
  }
`;

const Tooltip = ({ children, text }) => (
  <TooltipElem text={text}>
    {children}
  </TooltipElem>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Tooltip.defaultProps = {
  children: null,
};

export default Tooltip;
