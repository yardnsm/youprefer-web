import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.i`
  width: 24px;
  height: 24px;
  margin: 0;
  color: ${props => props.color}
`;

Icon.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Icon.defaultProps = {
  className: 'material-icons',
  color: 'rgba(0, 0, 0, 0.55)',
};

export default Icon;
