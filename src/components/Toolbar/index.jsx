import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToolbarWrapper = styled.header`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  z-index: 5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
              0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const ToolbarRow = styled.div`
  display: flex;
  position: relative;
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

const ToolbarRowInner = styled.div`
  display: inline-flex;
  flex: 1;
  align-items: flex-start;
  min-width: 0;
  z-index: 1;
  justify-content: flex-start;
  order: -1;
`;

const ToolbarRowSeperator = styled.div`
  margin-right: auto;
`;

const Toolbar = ({ rightElement, leftElement }) => (
  <ToolbarWrapper>
    <ToolbarRow>
      <ToolbarRowInner>

        {rightElement}
        <ToolbarRowSeperator />
        {leftElement}

      </ToolbarRowInner>
    </ToolbarRow>
  </ToolbarWrapper>
);

Toolbar.propTypes = {
  rightElement: PropTypes.node.isRequired,
  leftElement: PropTypes.node.isRequired,
};

export default Toolbar;
