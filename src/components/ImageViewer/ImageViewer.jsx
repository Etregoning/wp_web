import React from 'react'
import ReactDOM from 'react-dom'
import loadImage from 'blueimp-load-image'

class ImageViewer extends React.Component {
  // imageCanvas (){
  //   const node = ReactDOM.findDOMNode(this)
  // }
  

  
  componentDidMount() {
    loadImage(this.props.src, (img) => {
      img.className = 'fit_to_parent'; // css class: { max-width: 100%; max-height: 100%; }
      ReactDOM.findDOMNode(this.imageCanvas).appendChild(img);
    });
  }

  render() {
    
    return (
      <div
        style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        ref={(ref) => this.imageCanvas = ref}
      />);
  }
}

export default ImageViewer;