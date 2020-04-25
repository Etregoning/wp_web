import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import { Icon } from '@material-ui/core';
// import ImageViewer from 'components/ImageViewer/ImageViewer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import loadImage from 'blueimp-load-image'

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
});

class ImagePopover extends React.Component {
  state = {
    anchorEl: null,
    thumb: `https://wilderness.42.us.org${this.props.imgThumb}`,
    file:  ""
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount (thumb) {
    const loadImageOptions = { canvas: true, orientation: true }
    loadImage.parseMetaData(thumb, (data) => {
      if (data.exif && data.exif.get('Orientation')) {
        loadImageOptions.orientation = data.exif.get('Orientation')
      }
      loadImage(thumb, (canvas) => {
        thumb.preview = canvas.toDataURL(thumb.type)
        this.setState({ file: thumb })
      }, loadImageOptions)
    })
  }  

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    // const imgSrc  = this.props.imgSrc
    // const imgThumb = this.props.imgThumb
    // const imgUrl = `https://wilderness.42.us.org${imgSrc}`
    // const imgThumbUrl = `https://wilderness.42.us.org${imgThumb}`
    
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
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Click for full size image.</Typography>
          <LazyLoadImage src={this.state.file} alt="Image(s) of issue"/>
        </Popover>
      </div>
    );
  }
}

ImagePopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagePopover);
