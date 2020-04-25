import * as React from 'react';
import * as Reactdom from 'react-dom';
import * as loadimage from 'blueimp-load-image';

class ImageViewer extends React.Component<any, any> {
  private imageCanvas;
  public componentDidMount() {
    loadimage(this.props.src, (img) => {
      img.className = 'fit_to_parent'; // css class: { max-width: 100%; max-height: 100%; }
      Reactdom.findDOMNode(this.imageCanvas).appendChild(img);
    },
    {
      canvas:  true
    });
  }

  public render() {
    return (
      <div
        style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        ref={(ref) => this.imageCanvas = ref}
      />);
  }
}