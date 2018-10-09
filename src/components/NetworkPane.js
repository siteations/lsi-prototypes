import React, { Component } from 'react';
import { connect } from 'react-redux';

import {setSideTop} from '../action-creators/paneActions.js';

import * as d3 from "d3";

import TestNetwork from './TestNetwork.js';

var buttons = [
  {label: 'images', value: 'a'},
  {label: 'sites', value: 'b'},
  {label: 'science', value: 'c'},
  {label: 'social', value: 'd'},
  {label: 'senses', value: 'e'},
]


class MPNetwork extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }

 render(){
      var data = (this.props.agent.agentAssoc.nodes)? this.props.agent.agentAssoc : this.props.agent.allAssoc ;

    return (
    <div style={{height:this.props.hi}}>
      <TestNetwork height={this.props.hi} width={this.props.wide} data={data}/>
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    agent: state.agent,
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
