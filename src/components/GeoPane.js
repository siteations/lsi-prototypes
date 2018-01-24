import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl'

import EnlargeSide from './EnlargeSide.js';

import {setSideTop} from '../action-creators/paneActions.js';

mapboxgl.accessToken = 'pk.eyJ1IjoibHNpc3R1ZGVyIiwiYSI6ImNqY3NkeGhmYjBjOHkzMHQ2azQ2eng5N2kifQ.X9MtZX_O0rUT1bMB31nXTQ';

class SPGeo extends Component {
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
        });
        // map.addLayer({
        // "id": "terrain-data",
        // "type": "line",
        // "source": {
        //     type: 'vector',
        //     url: 'mapbox://mapbox.mapbox-terrain-v2'
        // },
        // "source-layer": "contour",
        // "layout": {
        //     "line-join": "round",
        //     "line-cap": "round"
        // },
        // "paint": {
        //     "line-color": "#000000",
        //     "line-width": .25
        // }
        // })
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
      <EnlargeSide loc='bottom' />
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} style={{position:'absolute', top:'33px', height:'100%', width:'100%'}} />
      </div>
    )
  }
}

/*
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Application extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
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

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}
*/


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

const Geo = connect(mapStateToProps, mapDispatchToProps)(SPGeo);

export default Geo;
