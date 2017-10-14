import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import withRipple from '../../hoc/withRipple';

const MenuItemWrapper = withRipple(styled.a`
  position: relative;
  padding: 0 16px;
  outline: none;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  background-color: #ffffff;
  transition: background cubic-bezier(0, 0, .2, 1) 250ms;

  &:hover {
    background-color: #e5e5e5;
  }

  &:active {
    background-color: #d8d8d8;
  }

  i.material-icons {
    width: 24px;
    height: 24px;
    margin-left: 32px;
    margin-right: 0;
    color: rgba(0, 0, 0, 0.55);
  }
`);

const MenuItem = ({ iconClassName, text, handleClick }) => (
  <MenuItemWrapper onClick={handleClick}>
    <i className="material-icons">{iconClassName}</i>
    <span>{text}</span>
  </MenuItemWrapper>
);

MenuItem.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default MenuItem;
