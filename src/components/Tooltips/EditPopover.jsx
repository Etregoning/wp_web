import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

class EditPopover extends React.Component {
  state = {
    anchorEl: this.anchor,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          onFocus={this.handlePopoverOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={this.handlePopoverClose}
        >
          <Typography>Click for full size image.</Typography>
        </Popover>
      </div>
    );
  }
}

EditPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditPopover);
