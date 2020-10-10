import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  touch-action: none;

  will-change: opacity;
  transition: opacity cubic-bezier(0, 0, 0.2, 1) 350ms;

  opacity: ${props => Number(!!props.visible)};
`;

Overlay.propTypes = {
  visible: PropTypes.bool,
  onClick: PropTypes.func,
};

Overlay.defaultProps = {
  visible: true,
  onClick: () => {},
};

export default Overlay;
