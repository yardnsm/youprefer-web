import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Icon';
import Button from '../Button';

import withRipple from '../../hoc/withRipple';

const IconButtonWrapper = styled(Button)`
  margin: -10px 8px;
  padding: 0.5px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;

  & ${Icon} {
    z-index: 1;
  }
`;

const IconButton = ({ iconClassName, onClick, color }) => (
  <IconButtonWrapper as="a" onClick={onClick}>
    <Icon color={color}>{iconClassName}</Icon>
  </IconButtonWrapper>
);

IconButton.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

IconButton.defaultProps = {
  onClick: () => {},
  color: 'white',
};

export default IconButton;
