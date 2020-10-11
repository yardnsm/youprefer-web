import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import {
  orCircleValue,
} from '../../config/strings';

const loadingAnim = keyframes`
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(200%);
  }
`;

const OrCircle = styled.div`
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: 300;

  background-color: #424242;
  border-radius: 50%;

  width: 60px;
  height: 60px;

  border: 1px solid #616161;
  box-shadow: 0px 0px 18px 3px rgba(0, 0, 0, 0.1);

  transform-origin: left top;
  transform: ${props => (props.loading ? 'scale(1.1)' : 'scale(1)')} translate(-50%, -50%);
  transition: transform cubic-bezier(0, 0, .2, 1) 700ms;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: #616161;
    z-index: -1;

    opacity: ${props => Number(props.loading)};

    transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: ${props => !props.loading && '600ms'};
    animation: ${loadingAnim} 300ms cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;

OrCircle.propTypes = {
  children: PropTypes.string,
  loading: PropTypes.bool,
};

OrCircle.defaultProps = {
  children: orCircleValue,
  loading: false,
};

export default OrCircle;
