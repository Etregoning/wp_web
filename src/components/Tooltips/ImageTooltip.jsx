import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'
import { Icon } from '@material-ui/core';

// const styles = {
//   root: {
//     width: 500,
//   },
// };

const handleTooltipOpen = imgSrc => {
  return <img src={imgSrc} alt="Image(s) of issue" />
};

const ImageTooltip = (imgSrc) => {
  // const { classes } = props;
  return (
    <div>
      {/* <Grid container justify="center">
        <Grid item xs={6}> */}
        
          <Tooltip 
            title="Click for full size image" 
            placement="left" 
            interactive
            leaveTouchDelay={250}
            leaveDelay={500}
            onOpen={handleTooltipOpen(imgSrc)}
            >
            <IconButton style={{ color: "#57AD5A", height:30, width: 30, margin: 0, padding: 0}}>
              <Icon>image</Icon>
            </IconButton>
          </Tooltip>
         
        {/* </Grid>
      
      </Grid> */}
    </div>
  );
}

ImageTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ImageTooltip