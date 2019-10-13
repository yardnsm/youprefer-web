import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  orCircleValue,
} from '../../../../config/strings';

const OrCircleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left top;
  transform: scale(1) translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  z-index: 5;
  background-color: #424242;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 1px solid #616161;
  box-shadow: 0px 0px 18px 3px rgba(0, 0, 0, 0.1);

  transition: transform cubic-bezier(0, 0, .2, 1) 700ms;

  ${props => props.loading && `
    transform: scale(1.1) translate(-50%, -50%);
  `}
`;

const OrCircle = (props) => (
  <OrCircleWrapper {...props}>
    <span>{orCircleValue}</span>
  </OrCircleWrapper>
);

OrCircle.propTypes = {
  loading: PropTypes.bool,
};

OrCircle.defaultProps = {
  loading: false,
};

export default OrCircle;
