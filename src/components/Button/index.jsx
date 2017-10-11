import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseToRgb, opacify, darken } from 'polished';

const processColor = (amount, color) =>
  typeof parseToRgb(color).alpha !== 'undefined' ?
    opacify(amount, color) :
    darken(amount, color);

const ButtonElem = styled.button`
  color: ${props => props.textColor};
  cursor: pointer;
  will-change: background, box-shadow;
  display: inline-block;
  position: relative;
  height: auto;
  min-width: 88px;
  padding: ${props => props.compact ? '0 8px' : '0 16px'};
  line-height: 36px;
  margin: 8px;
  border: none;
  border-radius: 2px;
  outline: none;
  background: ${props => props.bgColor};
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
  overflow: hidden;
  vertical-align: middle;
  box-sizing: border-box;

  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  width: ${props => props.fullWidth ? '100%' : 'auto'};
  visibility: ${props => props.hidden ? 'hidden' : 'visible'};

  box-shadow: ${props => !props.raised ? 'none' : `
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12)
  `};

  &:hover {
    background: ${props => processColor(0.10, props.bgColor)};

    box-shadow: ${props => !props.raised ? 'none' : `
      0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12)
    `};
  }

  &:active {
    background: ${props => processColor(0.15, props.bgColor)};

    box-shadow: ${props => !props.raised ? 'none' : `
      0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12)
    `};
  }
`;

const Button = ({
  text,
  fullWidth,
  textColor,
  bgColor,
  hidden,
  handleClick,
  compact,
  raised,
  icon,
}) => (
  <ButtonElem
    fullWidth={fullWidth}
    textColor={textColor}
    bgColor={bgColor}
    hidden={hidden}
    onClick={handleClick}
    compact={compact}
    raised={raised}
  >
    {icon}
    {text}
  </ButtonElem>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  hidden: PropTypes.bool,
  handleClick: PropTypes.func,
  compact: PropTypes.bool,
  raised: PropTypes.bool,
  icon: PropTypes.node,
};

Button.defaultProps = {
  fullWidth: false,
  textColor: '#ffffff',
  bgColor: 'rgba(128, 128, 128, 0)',
  hidden: false,
  handleClick: () => {},
  compact: false,
  raised: false,
  icon: null,
};

export default Button;
