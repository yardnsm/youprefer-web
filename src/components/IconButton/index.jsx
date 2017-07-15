import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconButtonWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  margin: 0 8px;
  color: white;
  position: relative;

  &::before {
    position: absolute;
    top: -30%;
    left: -33%;
    width: 40px;
    height: 40px;
    content: "";
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    opacity: 0;
    will-change: opacity;
    transition: opacity cubic-bezier(0, 0, .2, 1) 100ms;
  }

  &:hover::before {
    opacity: 0.4;
  },

  &:active::before {
    opacity: 1;
  }
`;

const IconButton = ({ iconClassName, handleClick }) => (
  <IconButtonWrapper onClick={handleClick} className="material-icons">
    {iconClassName}
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
