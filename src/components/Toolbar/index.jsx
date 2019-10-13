import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.header`
  box-sizing: border-box;
  position: fixed;
  z-index: 9;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;

  background-color: #212121;
  color: #ffffff;

  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
              0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const Row = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: auto;
  min-height: 64px;
  max-height: 64px;

  padding: 20px 28px;
  padding-left: 16px;

  box-sizing: border-box;

  /* Small devices, need to set properly for row aligning */
  @media (max-width: 768px) {
    min-height: 56px;
    max-height: 56px;

    padding: 16px 24px;
  }
`;

const Seperator = styled.div`
  margin-right: auto;
`;

const Toolbar = ({ rightElement, leftElement }) => (
  <Wrapper>
    <Row>
      {rightElement}
      <Seperator />
      {leftElement}
    </Row>
  </Wrapper>
);

Toolbar.propTypes = {
  rightElement: PropTypes.node,
  leftElement: PropTypes.node,
};

Toolbar.defaultProps = {
  rightElement: null,
  leftElement: null,
};

export default Toolbar;
