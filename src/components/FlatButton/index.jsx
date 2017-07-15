import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FlatButtonElem = styled.button`
  color: ${props => props.textColor || '#ffffff'};
  cursor: pointer;
  will-change: background;
  display: inline-block;
  position: relative;
  height: 46px;
  padding: 0 26px;
  margin: 0 10px;
  border: none;
  border-radius: 2px;
  outline: none;
  background: transparent;
  text-align: center;
  font-family: inherit;
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
  overflow: hidden;
  vertical-align: middle;
  box-sizing: border-box;
  transition: background cubic-bezier(0, 0, .2, 1) 100ms;

  width: ${props => props.fullWidth ? '100%' : 'auto'};
  visibility: ${props => props.hidden ? 'hidden' : 'visible'};

  &:hover {
    background-color: rgba(128, 128, 128, 0.15);
  }

  &:active {
    background-color: rgba(128, 128, 128, 0.25);
  }
`;

const FlatButton = ({ text, fullWidth, textColor, hidden, handleClick }) => (
  <FlatButtonElem
    fullWidth={fullWidth}
    textColor={textColor}
    hidden={hidden}
    onClick={handleClick}
  >
    {text}
  </FlatButtonElem>
);

FlatButton.propTypes = {
  text: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  textColor: PropTypes.string,
  hidden: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

FlatButton.defaultProps = {
  fullWidth: false,
  textColor: '#ffffff',
  hidden: false,
};

export default FlatButton;
