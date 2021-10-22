import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseToRgb, opacify, darken } from 'polished';

import withRipple from '../../hoc/withRipple';

const processColor = (amount, color) => (
  typeof parseToRgb(color).alpha !== 'undefined'
    ? opacify(amount, color)
    : darken(amount, color)
);

/* eslint-disable indent */
const Button = styled.button`
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'initial' : 'pointer')};

  display: inline-block;
  position: relative;
  box-sizing: border-box;

  outline: none;
  overflow: hidden;

  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 300;

  line-height: 36px;
  vertical-align: middle;

  border: none;
  border-radius: 2px;

  color: ${props => props.textColor};
  background: ${props => props.backgroundColor};
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  height: auto;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  min-width: 88px;

  margin: 8px;
  padding: ${props => (props.compact ? '2px 10px' : '8px 16px')};

  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};

  will-change: background, box-shadow;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  box-shadow: ${props => (
    !props.raised
      ? 'none'
      : `0px 3px 1px -2px rgba(0, 0, 0, 0.2),
         0px 2px 2px 0px rgba(0, 0, 0, 0.14),
         0px 1px 5px 0px rgba(0, 0, 0, 0.12)`
  )};

  /* Big devices, apply hover and active states */
  @media (min-width: 768px) {
    &:hover {
      background: ${props => processColor(0.10, props.backgroundColor)};

      box-shadow: ${props => (
        !props.raised
          ? 'none'
          : `0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12)`
      )};
    }

    &:active {
      box-shadow: ${props => (
        !props.raised
        ? 'none'
        : `0px 5px 5px -3px rgba(0, 0, 0, 0.2),
          0px 8px 10px 1px rgba(0, 0, 0, 0.14),
          0px 3px 14px 2px rgba(0, 0, 0, 0.12)`
      )};
    }
  }
`;
/* eslint-disable indent */

Button.propTypes = {
  fullWidth: PropTypes.bool,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
  raised: PropTypes.bool,

  children: PropTypes.node,
};

Button.defaultProps = {
  fullWidth: false,
  textColor: '#ffffff',
  backgroundColor: 'rgba(128, 128, 128, 0)',
  hidden: false,
  disabled: false,
  onClick: () => {},
  compact: false,
  raised: false,
  children: null,
};

export default withRipple(Button);
