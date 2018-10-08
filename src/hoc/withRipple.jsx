import React from 'react';
import styled from 'styled-components';
import { parseToHsl } from 'polished';

import RippleInk from '../components/RippleInk';

const colorPresets = {
  dark: 'rgba(128, 128, 128, 0.4)',
  light: 'rgba(255, 255, 255, 0.2)',
};

function withRipple(WrappedComponent) {
  const StyledComponent = styled(WrappedComponent)`
    position: relative;
    z-index: 1;
    overflow: hidden;
  `;

  /* eslint-disable react/prop-types */
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        inks: [],
      };

      this.clearInks = this.clearInks.bind(this);
      this.handleClick = this.handleClick.bind(this);

      this.timeout = null;
    }

    clearInks() {
      this.setState({
        inks: [],
      });
    }

    handleClick(evt) {
      const { onClick } = this.props;
      const { inks } = this.state;
      const { currentTarget: target } = evt;

      const rect = target.getBoundingClientRect();

      const dim = Math.max(rect.width, rect.height);

      const x = evt.pageX - rect.left - (dim / 2);
      const y = evt.pageY - rect.top - (dim / 2);

      // Figure out automatically whether
      // the target element's color is dark
      // or light
      let rippleColor = 'light';
      const targetBgColor = window.getComputedStyle(target, null)
        .getPropertyValue('background-color');

      if (targetBgColor) {
        const hsl = parseToHsl(targetBgColor);

        rippleColor = ((hsl.lightness + hsl.saturation) / 2) <= 0.5 ? 'dark' : 'light';
      }

      const color = colorPresets[rippleColor];

      const ink = {
        dim,
        x,
        y,
        color,
      };

      this.setState({
        inks: inks.concat([ink]),
      });

      // Re-set the timeout since we don't want
      // to cause re-render when we'll change the state.
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.clearInks(ink);
      }, 550);

      // Call the wrapped element onclick event
      if (onClick) {
        onClick(evt);
      }
    }

    render() {
      const { children } = this.props;
      const { inks } = this.state;

      return (
        <StyledComponent {...this.props} onClick={this.handleClick}>
          {children}
          {inks.map(ink => (
            <RippleInk dim={ink.dim} x={ink.x} y={ink.y} rippleColor={ink.color} />
          ))}
        </StyledComponent>
      );
    }
  };
}

export default withRipple;
