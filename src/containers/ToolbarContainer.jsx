import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';

import Toolbar from '../components/Toolbar';
import IconButton from '../components/IconButton';

const mapStateToProps = ({ game: { questions: { current } } }) => ({
  currentQuestion: current,
});

const mapDispatchToProps = dispatch => ({
  handleDrawerToggle: () => { dispatch(uiActions.toggleDrawer()); },
  showShareDialog: () => { dispatch(uiActions.showShareDialog()); },
});

const ToolbarContainer = ({ currentQuestion, handleDrawerToggle, showShareDialog }) => (
  <Toolbar
    rightElement={(
      <IconButton iconClassName="menu" handleClick={handleDrawerToggle} />
    )}
    leftElement={(
      <div>
        {currentQuestion &&
          <IconButton iconClassName="share" handleClick={showShareDialog} />}
      </div>
    )}
  />
);

ToolbarContainer.propTypes = {
  currentQuestion: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  showShareDialog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer);
