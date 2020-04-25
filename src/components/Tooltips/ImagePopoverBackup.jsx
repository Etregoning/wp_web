import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import { Icon } from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
  },
});

const handlePopoverOpen = event => {
  this.setState({ anchorEl: event.currentTarget });
};

const handlePopoverClose = () => {
  this.setState({ anchorEl: null });
};

const ImagePopover = (props, imgSrc) => {

    const anchor= null
    const { classes } = props;
    const { anchorEl } = {}
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton 
          style={{ 
            color: "#57AD5A", 
            height:30, 
            width: 30, 
            margin: 0, 
            padding: 0}}

            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={this.handlePopoverOpen}
            onMouseLeave={this.handlePopoverClose}
        >
              <Icon>image</Icon>
          </IconButton>
        <Popover
          id="mouse-over-popover"
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchor}
          anchorOrigin={{

            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          >
          Hover with a Popover.
          </Typography>
          doodoo
        </Popover>
      </div>
    );
  }


ImagePopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagePopover);
