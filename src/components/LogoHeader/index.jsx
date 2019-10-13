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
    background-color: #2196f3;
  }

  &::after {
    right: 0;
    background-color: #f44336;
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

const Ribbon = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: inline-block;
  padding: 10px 50px;

  background-color: #990000;
  color: #ffffff;

  transform: rotate(-45deg) translate(-25%, -50%);
`;

const DrawerHeader = ({ height }) => (
  <Wrapper height={height}>

    <Background />
    <QuestionCircle />

    <Ribbon>BETA</Ribbon>
  </Wrapper>
);

DrawerHeader.propTypes = {
  height: PropTypes.string,
};

DrawerHeader.defaultProps = {
  height: '160px',
};

export default DrawerHeader;
