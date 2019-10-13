import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  orCircleValue,
} from '../../config/strings';

const OrCircle = styled.div`
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;

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
