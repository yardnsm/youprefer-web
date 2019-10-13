import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  position: relative;
  overflow: hidden;

  width: 100%;
  height: ${props => props.height || '160px'};
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  /* Skew is better performant than rotate */
  transform: skew(30deg, 0) scale(1.5);

  &::before, &::after {
    content: "";

    position: absolute;
    top: 0;

    height: 100%;
    width: 50%;
  }

  &::before {
    left: 0;
    background-color: ${props => props.theme.options.first};
  }

  &::after {
    right: 0;
    background-color: ${props => props.theme.options.second};
  }
`;

const QuestionCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 80px;
  height: 80px;

  background-image: url("assets/img/question_circle.png" );
  background-repeat: no-repeat;
  background-size: cover;
`;

const LogoHeader = ({ height }) => (
  <Wrapper height={height}>

    <Background />
    <QuestionCircle />
  </Wrapper>
);

LogoHeader.propTypes = {
  height: PropTypes.string,
};

LogoHeader.defaultProps = {
  height: '160px',
};

export default LogoHeader;
