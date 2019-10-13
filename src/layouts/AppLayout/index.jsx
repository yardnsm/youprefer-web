import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import ToolbarContainer from '../../containers/ToolbarContainer';
import DrawerContainer from '../../containers/DrawerContainer';
import AboutDialogContainer from '../../containers/AboutDialogContainer';
import ShareMenuContainer from '../../containers/ShareMenuContainer';
import SnackbarContainer from '../../containers/SnackbarContainer';

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: ${props => props.theme.background};
    font-family: "Heebo", sans-serif;
    direction: rtl;
    box-sizing: border-box;
  }

  * {

    /* Disable tap highlighting */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;

    /* Disable user selection */
    user-select: none;
    -o-user-select:none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }

  body {

    /* Disables pull-to-refresh and overscroll glow effect */
    overscroll-behavior-y: none;
  }
`;

const Wrapper = styled.main`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: auto;

  color: ${props => props.theme.text.primary};
`;

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: 100px 5px 0 5px;

  width: 840px;

  @media (max-width: 940px) {
    width: auto;
    padding-top: 84px;
  }
`;

const AppLayout = ({ children }) => (
  <>
    <GlobalStyle />
    <Wrapper>

      <ToolbarContainer />
      <DrawerContainer />

      {/* Routes goes here */}
      <Container>
        {children}
      </Container>

      <SnackbarContainer />
      <AboutDialogContainer />
      <ShareMenuContainer />

    </Wrapper>
  </>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
