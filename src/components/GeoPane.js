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

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      //style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      zoom
    });

    this.map.on('load', () => {
        this.map.addSource('dem', {
            "type": "raster-dem",
            "url": "mapbox://mapbox.terrain-rgb"
        });
        this.map.addLayer({
            "id": "hillshading",
            "source": "dem",
            "type": "hillshade",
            "hillshade-exaggeration": 1
        // insert below waterway-river-canal-shadow;
        // where hillshading sits in the Mapbox Outdoors style
        });
    });

    this.marker = new mapboxgl.Marker()
      .setLngLat([lng,lat])
      .addTo(this.map);

    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
  }

  shouldComponentUpdate(nextProps){
    console.log(this.props.nav.siteId, nextProps.nav.siteId);
    return this.props.nav.siteId !== nextProps.nav.siteId ;
  }

  componentDidUpdate(){
    var lng = this.props.nav.siteObj.g_longitude;
    var lat = this.props.nav.siteObj.g_latitude;

    if (lng){
    this.setState({
        lng: this.props.nav.siteObj.g_longitude,
        lat: this.props.nav.siteObj.g_latitude,
      });

    this.map.setCenter([lng, lat]);
    this.marker.setLngLat([lng,lat]);

    }

  }



    render(){
      const { lng, lat, zoom } = this.state;

    return (
      <div style={{height:this.props.hi}} >
      <EnlargeSide loc='bottom' />
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} style={{position:'absolute', top:'33px', height:'100%', width:'100%'}} />
        <div style={{position: 'absolute', top: this.props.hi, paddingLeft: '10px'}}>
          {this.props.nav.siteName}<br/>
          caption here
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

const SGeoSide = connect(mapStateToProps, mapDispatchToProps)(SPGeo);

export default SGeoSide;
