import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapboxgl from 'mapbox-gl';

import EnlargeSide from './EnlargeSide.js';

import {setSideTop} from '../action-creators/paneActions.js';

const L = window.L;
console.log(L);

var accessToken = 'pk.eyJ1IjoibHNpc3R1ZGVyIiwiYSI6ImNqY3NkeGhmYjBjOHkzMHQ2azQ2eng5N2kifQ.X9MtZX_O0rUT1bMB31nXTQ';

var key = '914171c34bde47298e39390e8f619227';

class SGeo extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {
      lng: -0.3027728,
      lat: 51.4772129,
      zoom: 12
    };
 }


//https://services.arcgisonline.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
    <div style={{height:this.props.hi*.98, width:this.props.hi/.66*.98}} >
        {/*<div ref={'mapDiv'} style={{position:'relative', top:'70px'+this.props.hi, width:this.props.hi/.66*.96, height:this.props.hi*.95}} >*/}
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
            url={'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{x}{y}{z}'}
            attribution='mapbox-terrain'
            opacity={0}
          />

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
        <EnlargeSide loc='bottom' />
        {this.props.site.siteObj.g_longitude &&
        <div style={{position: 'absolute', top: this.props.hi*2, paddingLeft: '10px'}}>
          {this.props.site.siteName}<br/>
          options here by layers - large scale only
        </div>
        }
      </div>
    )
  }

  //   render(){
  //     //const { lng, lat, zoom } = this.state;
  //     //console.log(this.props.hi*2);

  //   return (
  //     <div style={{height:this.props.hi*.98, width:this.props.hi/.66*.98}} >
  //       <div ref={'mapDiv'} style={{position:'relative', top:'70px'+this.props.hi, width:this.props.hi/.66*.96, height:this.props.hi*.95}} >
  //       <div ref={el => this.mapContainer = el} style={{position: 'absolute', top:0, bottom:0, right:0, left:0 }} />
  //       </div>
  //       <EnlargeSide loc='bottom' />
  //       {this.props.site.siteObj.g_longitude &&
  //       <div style={{position: 'absolute', top: this.props.hi*2, paddingLeft: '10px'}}>
  //         {this.props.site.siteName}<br/>
  //         options here by layers - large scale only
  //       </div>
  //       }
  //     </div>
  //   )
  // }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    res: state.res,
    site: state.site,
    img: state.img
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSideTop: (type, tab) => {
        dispatch(setSideTop(type, tab));
    },
  }
}

const SGeoSide = connect(mapStateToProps, mapDispatchToProps)(SGeo);

export default SGeoSide;
