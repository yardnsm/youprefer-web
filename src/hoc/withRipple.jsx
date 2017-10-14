import React from 'react';
import styled from 'styled-components';

import RippleInk from '../components/RippleInk';

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
      const { inks } = this.state;
      const { currentTarget: target } = evt;

      const rect = target.getBoundingClientRect();

      const dim = Math.max(rect.width, rect.height);

      const x = evt.pageX - rect.left - (dim / 2);
      const y = evt.pageY - rect.top - (dim / 2);

      const ink = {
        dim,
        x,
        y,
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
      if (this.props.onClick) {
        this.props.onClick(evt);
      }
    }

    render() {
      const { children } = this.props;

      return (
        <StyledComponent {...this.props} onClick={this.handleClick}>
          {children}
          {this.state.inks.map(ink => (
            <RippleInk dim={ink.dim} x={ink.x} y={ink.y} />
          ))}
        </StyledComponent>
      );
    }
  };
}

export default withRipple;
