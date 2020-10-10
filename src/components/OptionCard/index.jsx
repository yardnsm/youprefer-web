import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import withRipple from '../../hoc/withRipple';

import {
  optionCardVotes,
} from '../../config/strings';

/* eslint-disable indent */
const Wrapper = withRipple(styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 3;

  margin: 20px;
  padding: 15px 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 50%;
  height: 200px;

  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;

  opacity: ${props => (props.enabled ? 1 : 0.75)};
  transform: ${props => (props.enabled ? 'none' : 'scale(0.9)')};

  font-size: 18px;

  background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), transparent);
  background-size: 100% 100%;
  background-color: ${props => props.theme.options[props.type]};

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  margin-left: ${props => props.type === 'first' && '10px'};
  margin-right: ${props => props.type === 'second' && '10px'};

  will-change: opacity, transform;
  transition: opacity, transform cubic-bezier(0, 0, .2, 1) 700ms;

  /* Hover effect */
  &::before {
    content: "";

    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.25);

    opacity: ${props => (
      (!props.enabled || props.selected) ?
        '1 !important' :
        '0'
    )};

    will-change: opacity;
    transition: opacity cubic-bezier(0, 0, .2, 1) 700ms;

    /* Show check sign when selected */
    ${props => props.selected && `
      background-image: url("assets/img/check_sign.png");
      background-position: 10px 10px;
      background-size: 40px;
      background-repeat: no-repeat;
    `}
  }

  /* Big devices, apply hover state */
  @media (min-width: 768px) {
    &:hover::before {
      opacity: 0.6;
    }
  }

  /* The sliced shape */
  &::after {
    content: "";

    position: absolute;
    z-index: 2;
    top: 50%;

    width: 80px;
    height: 80px;

    border-radius: 50%;
    background-color: #424242;

    box-shadow: inset 0px 0px 18px 3px rgba(0, 0, 0, 0.25),
                0px 1px 0px 1px rgba(255, 255, 255, 0.15),
                0px 0px 0px 1px rgba(255, 255, 255, 0.1);

    /* Align the sliced shape properly based on the type */
    left: ${props => props.type === 'first' && 0};
    right: ${props => props.type === 'second' && 0};

    transform: ${props => (
      props.type === 'first' ? 'translate(-62%, -50%)' : 'translate(62%, -50%)'
    )};
  }

  /* Small devices, need to set properly for row aligning */
  @media (max-width: 768px) {
    margin: 10px !important;

    width: 90%;
    max-height: 170px;

    /* Positioning the sliced shape based on type */
    &::after {
      top: ${props => (
        props.type === 'first' ? '100%' : 0
      )} !important;

      left: ${props => props.type === 'first' && '50% !important'};
      right: ${props => props.type === 'second' && '50% !important'};

      transform: ${props => (
        props.type === 'first' ? 'translate(-50%, -38%)' : 'translate(50%, -62%)'
      )} !important;
    }
  }
`, 'dark');
/* eslint-enable indent */

const PercentageText = styled.div`
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0px 3px 40px rgba(0, 0, 0, 0.55);

  font-size: 3em;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 2.2em;
    margin-bottom: 4px;
  }
`;

const VotesText = styled.div`
  font-weight: 300;
  letter-spacing: 1.5px;
  font-size: 0.75em;
  margin-bottom: 18px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const ValueText = styled.div`
  letter-spacing: 1.5px;
`;

const OptionCard = ({
  type,
  enabled,
  showBack,
  selected,
  value,
  votes,
  percentage,
  onClick,
}) => (
  <Wrapper
    type={type}
    selected={selected}
    enabled={enabled}
    onClick={(!showBack && enabled) ? (() => { onClick(type); }) : undefined}
  >
    {!showBack ? (
      <span>{value}</span>
    ) : (
      <div>
        <PercentageText>{`${percentage}%`}</PercentageText>
        <VotesText>{`${votes} ${optionCardVotes}`}</VotesText>
        <ValueText>{value}</ValueText>
      </div>
    )}
  </Wrapper>
);

OptionCard.propTypes = {
  type: PropTypes.oneOf(['first', 'second']).isRequired,
  enabled: PropTypes.bool,
  showBack: PropTypes.bool,
  selected: PropTypes.bool,
  value: PropTypes.string,
  votes: PropTypes.number,
  percentage: PropTypes.number,
  onClick: PropTypes.func,
};

OptionCard.defaultProps = {
  enabled: true,
  showBack: false,
  selected: false,
  value: '',
  votes: 0,
  percentage: 0,
  onClick: () => {},
};

export default OptionCard;
