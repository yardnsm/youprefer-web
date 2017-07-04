import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as uiActions } from '../actions/ui';

import Toolbar from '../components/Toolbar';
import IconButton from '../components/IconButton';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleDrawerToggle: () => { dispatch(uiActions.toggleDrawer()); },
});

const ToolbarContainer = ({ handleDrawerToggle }) =>
  (<Toolbar
    rightElement={(
      <IconButton iconClassName="menu" handleClick={handleDrawerToggle} />
    )}
    leftElement={(
      <div>
        <IconButton iconClassName="share" />
      </div>
    )}
  />);

ToolbarContainer.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer);
