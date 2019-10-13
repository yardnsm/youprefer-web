import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

  & i.material-icons {
    width: 24px;
    height: 24px;

    margin-left: 32px;
    margin-right: 0;

    color: rgba(0, 0, 0, 0.55);
  }
`);

const MenuItem = ({ iconClassName, children, onClick }) => (
  <MenuItemWrapper onClick={onClick}>
    <i className="material-icons">{iconClassName}</i>
    {children}
  </MenuItemWrapper>
);

MenuItem.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  onClick: () => {},
};

export default MenuItem;
