import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';
import LocalPropTypes from '../prop-types';

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
  currentQuestion: LocalPropTypes.question,
  handleDrawerToggle: PropTypes.func.isRequired,
  showShareDialog: PropTypes.func.isRequired,
};

ToolbarContainer.defaultProps = {
  currentQuestion: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer);
