import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Icon';
import withRipple from '../../hoc/withRipple';

const MenuItemWrapper = withRipple(styled.a`
  position: relative;

  padding: 0 16px;
  height: 48px;

  outline: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: rgba(0, 0, 0, 0.87);
  background-color: #ffffff;

  transition: background cubic-bezier(0, 0, .2, 1) 250ms;

  &:hover {
    background-color: #e5e5e5;
  }

  & ${Icon} {
    margin-left: 32px;
  }
`);

const MenuItem = ({ children, onClick }) => (
  <MenuItemWrapper onClick={onClick}>
    {children}
  </MenuItemWrapper>
);

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  onClick: () => {},
};

export default MenuItem;
