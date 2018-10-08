import React, { Component } from 'react';
import { connect } from 'react-redux';
//import ImageGallery from 'react-image-gallery';
import ImageGallery from './ImageGallery.js';

import EnlargeSide from './EnlargeSide.js';

import {setSideTop} from '../action-creators/paneActions.js';


class MPImages extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }



    render(){

      //console.log(this.props.hi)

      const images = (this.props.img.figActive)? this.props.img.figGallery : this.props.img.siteGallery


    return (
    <div style={{height:this.props.hi}} id='images'>
      <ImageGallery items={images} hi={this.props.hi} loc="side" />
      <div className='plusOverlay'>
        <EnlargeSide loc='top' />
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    img: state.img,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSideTop: (type, tab) => {
        dispatch(setSideTop(type, tab));
    },
  }
}

const MImagesSide = connect(mapStateToProps, mapDispatchToProps)(MPImages);

export default MImagesSide;
