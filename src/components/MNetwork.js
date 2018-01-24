import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import GeoPane  from './GeoPane.js';
import NetworkPane  from './TextPane.js';

import {setSideTop} from '../action-creators/paneActions.js';

var buttons = [
  {label: 'geo', value: 'a'},
  {label: 'discourse', value: 'b'},
  {label: 'matter', value: 'c'},
  {label: 'forms', value: 'd'}
]


class MPNetwork extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }

 componentDidMount(){
   //console.dir(document.getElementById('sidePane').clientWidth)
   var wide = document.getElementById('largePane').clientWidth
   var height = wide*.69 - 37

   this.setState({width: wide, height})
 }



    render(){
    return (
    <div>

      <Tabs buttons={buttons} placement='main' />

      <div className='scrollPaneL' >
      {this.props.pane.mainTab==='a' &&
        <GeoPane hi={this.state.height} scale='generic'/>
      }
      {this.props.pane.mainTab==='b' &&
        <NetworkPane focus='discourse' />
      }
      {this.props.pane.mainTab==='c' &&
        <NetworkPane focus='matter' />
      }
      {this.props.pane.mainTab==='d' &&
        <NetworkPane focus='form' />
      }

      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSideTop: (type, tab) => {
        dispatch(setSideTop(type, tab));
    },
  }
}

const MNetwork = connect(mapStateToProps, mapDispatchToProps)(MPNetwork);

export default MNetwork;
