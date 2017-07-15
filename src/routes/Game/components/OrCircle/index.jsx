import React from 'react';
import styled from 'styled-components';

const OrCircleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  z-index: 5;
  background-color: #424242;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 1px solid #616161;
  box-shadow: 0px 0px 18px 3px rgba(0, 0, 0, 0.1);
`;

const OrCircle = () => (
  <OrCircleWrapper>
    <span>או</span>
  </OrCircleWrapper>
);

export default OrCircle;
