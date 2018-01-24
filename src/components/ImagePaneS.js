import React, { Component } from 'react';
import { connect } from 'react-redux';
//import ImageGallery from 'react-image-gallery';
import ImageGallery from './ImageGallery.js';

import EnlargeSide from './EnlargeSide.js';

import {setSideTop} from '../action-creators/paneActions.js';

var buttons = [
  {label: 'images', value: 'a'},
  {label: 'sites', value: 'b'},
  {label: 'science', value: 'c'},
  {label: 'social', value: 'd'},
  {label: 'senses', value: 'e'},

]


class MPImages extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }



    render(){

      console.log(this.props.hi)

      const images = [
      {
        original: './img/Seine_1862_Hydro_carte_1L.jpg',
        thumbnail: './img/Seine_1862_Hydro_carte_1S.jpg',
        originalClass:'testing',
      },
      {
        original: './img/Seine_1862_Hydro_carte_2L.jpg',
        thumbnail: './img/Seine_1862_Hydro_carte_2S.jpg',
        originalClass:'testing',
      },
      {
        original: './img/Seine_1862_Hydro_carte_3L.jpg',
        thumbnail: './img/Seine_1862_Hydro_carte_3S.jpg',
        originalClass:'testing',
      },
      {
        original: './img/Seine_1862_Hydro_carte_4L.jpg',
        thumbnail: './img/Seine_1862_Hydro_carte_4S.jpg',
        originalClass:'testing',
      }
    ]


    return (
    <div style={{height:this.props.hi}} id='images'>
      <ImageGallery items={images} hi={this.props.hi} />
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
