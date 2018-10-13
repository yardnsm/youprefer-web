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

      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.handleMouseOut = this.handleMouseOut.bind(this);
      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);

      this.timeout = null;
      this.touchLock = false;
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    removeAllInks() {
      this.releaseAllInks();

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setState({
          inks: [],
        });
      }, 3000);
    }

    releaseAllInks() {
      const { inks } = this.state;

      this.setState({
        inks: inks.map(ink => ({
          ...ink,
          released: true,
        })),
      });
    }

    handleMouseDown(event) {
      if (this.touchLock) {
        this.touchLock = false;
        return;
      }

      const { inks } = this.state;
      const { currentTarget: target } = event;

      const rect = target.getBoundingClientRect();

      const dim = Math.max(rect.width, rect.height);

      const x = event.pageX - rect.left - (dim / 2);
      const y = event.pageY - rect.top - (dim / 2);

      // Figure out automatically whether the target element's color is dark or
      // light
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
        released: false,
        id: +new Date(),
      };

      this.setState({
        inks: inks.concat([ink]),
      });

      // Setting a safty threshold so inks won't stay for a long time
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.removeAllInks(ink);
      }, 3000);
    }

    handleMouseUp() {
      this.releaseAllInks();
    }

    handleMouseOut() {
      this.releaseAllInks();
    }

    handleTouchStart(event) {
      // Emulate a `mousedown` event. Kinda. This is good enough for this
      // particular use case, so meh.
      this.handleMouseDown({
        ...event,
        pageX: event.touches[0].pageX,
        pageY: event.touches[0].pageY,
      });

      this.touchLock = true;
    }

    handleTouchEnd() {
      this.releaseAllInks();

      // Since we can set the `touchstart` event to `passing: false` (and call
      // preventDefault), we're doing this nasrty hack. meh.
      setTimeout(() => {
        this.touchLock = false;
      }, 300);
    }

    render() {
      const { children } = this.props;
      const { inks } = this.state;

      return (
        <StyledComponent
          {...this.props}

          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseOut={this.handleMouseOut}
          onBlur={this.handleMouseOut}

          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {children}
          {inks.map(ink => (
            <RippleInk
              key={ink.id}
              dim={ink.dim}
              x={ink.x}
              y={ink.y}
              rippleColor={ink.color}
              released={ink.released}
            />
          ))}
        </StyledComponent>
      );
    }
  };
}

export default withRipple;
