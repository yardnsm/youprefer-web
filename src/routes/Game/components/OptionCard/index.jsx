import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  optionCardVotes,
} from '../../../../config/strings';

const OptionCardWrapper = styled.div`
  padding: 15px 50px;
  margin: 20px;
  width: 50%;
  height: 200px;
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  transform: none;
  cursor: pointer;
  font-size: 18px;
  position: relative;
  background-image: url("assets/img/lighting_overlay.png");
  background-size: 100% 100%;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  background-color: ${props => props.type === 'first' ? '#2196f3' : '#f44336'};
  margin-left: ${props => props.type === 'first' && '10px'};
  margin-right: ${props => props.type === 'second' && '10px'};

  /* Small devices, need to set properly for row aligning */
  @media (max-width: 768px) {
    margin: 10px !important;
    width: 90%;
    max-height: 170px;

    /* Positioning the sliced shape based on type */
    &::after {
      top: ${props => props.type === 'first' ? '100%' : 0} !important;
      left: ${props => props.type === 'first' && '50% !important'};
      right: ${props => props.type === 'second' && '50% !important'};
      transform: ${props => props.type === 'first' ?
        'translate(-50%, -38%)' :
        'translate(50%, -62%)'} !important;
    }
  }

  /* Hover effect */
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: rgba(0, 0, 0, 0.25);
    opacity: 0;
    z-index: 1;
    will-change: opacity;
    transition: opacity cubic-bezier(0, 0, .2, 1) 700ms;

    ${props => props.selected && `
      opacity: 1 !important;
      background-image: url("assets/img/check_sign.png");
      background-position: 10px 10px;
      background-size: 40px;
      background-repeat: no-repeat;
    `}
  }

  &:hover::before {
    opacity: 0.6;
  }

  &:active::before {
    opacity: 1;
  }

  /* The sliced shape */
  &::after {
    position: absolute;
    top: 50%;
    content: "";
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #424242;
    z-index: 2;
    box-shadow: inset 0px 0px 18px 3px rgba(0, 0, 0, 0.25),
                0px 1px 0px 1px rgba(255, 255, 255, 0.15),
                0px 0px 0px 1px rgba(255, 255, 255, 0.1);

    /* Align the sliced shape properly based on the type */
    left: ${props => props.type === 'first' && 0};
    right: ${props => props.type === 'second' && 0};

    transform: ${props => props.type === 'first' ?
      'translate(-62%, -50%)' :
      'translate(62%, -50%)'};
  }
`;

const OptionCardInner = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const PercentageText = styled.div`
  font-size: 3em;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0px 3px 40px rgba(0, 0, 0, 0.55);
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
  showBack,
  selected,
  value,
  votes,
  percentage,
  handleOptionSelect,
}) => (
  <OptionCardWrapper
    type={type}
    selected={selected}
    onClick={!showBack && (() => { handleOptionSelect(type); })}
  >
    <OptionCardInner>
      {!showBack ?
        <span>{value}</span> :
        <div>
          <PercentageText>{`${percentage}%`}</PercentageText>
          <VotesText>{`${votes} הצבעות`}</VotesText>
          <ValueText>{value}</ValueText>
        </div>}
    </OptionCardInner>
  </OptionCardWrapper>
);

OptionCard.propTypes = {
  type: PropTypes.string.isRequired,
  showBack: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
};

export default OptionCard;
