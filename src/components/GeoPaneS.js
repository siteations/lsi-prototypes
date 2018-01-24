import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl'

import EnlargeSide from './EnlargeSide.js';

import {setSideTop} from '../action-creators/paneActions.js';

mapboxgl.accessToken = 'pk.eyJ1IjoibHNpc3R1ZGVyIiwiYSI6ImNqY3NkeGhmYjBjOHkzMHQ2azQ2eng5N2kifQ.X9MtZX_O0rUT1bMB31nXTQ';

class SPNetwork extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {
      lng: -0.3027728,
      lat: 51.4772129,
      zoom: 10
    };
 }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      //style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      attributionControl: false,
      zoom
    });

    map.on('load', () => {
        map.addSource('dem', {
            "type": "raster-dem",
            "url": "mapbox://mapbox.terrain-rgb"
        });
        map.addLayer({
            "id": "hillshading",
            "source": "dem",
            "type": "hillshade",
            "hillshade-exaggeration": 1
        // insert below waterway-river-canal-shadow;
        // where hillshading sits in the Mapbox Outdoors style
        //}, 'waterway-river-canal-shadow');
        });
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }



    render(){
      const { lng, lat, zoom } = this.state;
      console.log(this.props.hi);

    return (
      <div style={{height:this.props.hi}} >
        <div ref={el => this.mapContainer = el} style={{position:'absolute', top:'66px'+this.props.hi, height:this.props.hi, width:'100%'}} />
        <EnlargeSide loc='bottom' />
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

const SGeoSide = connect(mapStateToProps, mapDispatchToProps)(SPNetwork);

export default SGeoSide;
