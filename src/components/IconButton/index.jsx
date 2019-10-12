import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withRipple from '../../hoc/withRipple';

const IconButtonWrapper = withRipple(styled.a`
  text-decoration: none;
  cursor: pointer;
  margin: -10px 8px;
  padding: 0.5px 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  will-change: background;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.10);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.15);
  }

  & .material-icons {
    z-index: 1;
  }
`);

const IconButton = ({ iconClassName, handleClick }) => (
  <IconButtonWrapper onClick={handleClick}>
    <i className="material-icons">{iconClassName}</i>
  </IconButtonWrapper>
);

IconButton.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

IconButton.defaultProps = {
  handleClick: () => {},
};

export default IconButton;
