import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

import ToolbarContainer from '../../containers/ToolbarContainer';
import DrawerContainer from '../../containers/DrawerContainer';
import AboutDialogContainer from '../../containers/AboutDialogContainer';
import ShareDialogContainer from '../../containers/ShareDialogContainer';
import SnackbarContainer from '../../containers/SnackbarContainer';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  :root {
    background-color: #424242;
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
`;

const Wrapper = styled.main`
  color: #F6F6F6;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
`;

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 840px;
  padding-top: 80px;

  @media (max-width: 940px) {
    width: auto;
    padding-top: 64px;
  }
`;

const AppLayout = ({ children }) => (
  <Wrapper>

    <ToolbarContainer />
    <DrawerContainer />

    <Container>
      {children}
    </Container>

    <SnackbarContainer />

    <AboutDialogContainer />
    <ShareDialogContainer />

  </Wrapper>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
