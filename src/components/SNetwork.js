import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import GeoPane  from './GeoPaneS.js';
import NetworkPane  from './NetworkPaneS.js';


var buttons = [
  {label: 'geo', value: 'a'},
  {label: 'discourse', value: 'b'},
  {label: 'matter', value: 'c'},
  {label: 'forms', value: 'd'},
]

class SBNet extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }

  render(){

    return (
    <div>
      <Tabs buttons={buttons} placement='bottom' />

      <div >
      {this.props.pane.bottomTab==='a' &&
        <GeoPane scale='generic' hi={this.props.hi} loc='bottom' />
      }
      {this.props.pane.bottomTab==='b' &&
        <NetworkPane focus='discourse' hi={this.props.hi} loc='bottom' />
      }
      {this.props.pane.bottomTab==='c' &&
        <NetworkPane focus='matter' hi={this.props.hi} loc='bottom' />
      }
      {this.props.pane.bottomTab==='d' &&
        <NetworkPane focus='form' hi={this.props.hi} loc='bottom' />
      }
      </div>
    </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    res: state.res,
    site: state.site,
    }
}


const SBNetworks = connect(mapStateToProps, null)(SBNet);

export default SBNetworks;
