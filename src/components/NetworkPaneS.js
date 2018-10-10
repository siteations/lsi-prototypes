import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

import EnlargeSide from './EnlargeSide.js';
import {setSideTop} from '../action-creators/paneActions.js';

import TestNetwork from './TestNetwork.js';


class SPNetwork extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }
  render(){
    var data = (this.props.agent.agentAssoc.nodes)? this.props.agent.agentAssoc : this.props.agent.allAssoc ;
    console.log(data);

    return (
    <div style={{height:this.props.hi}}>
      <TestNetwork height={this.props.hi} width={this.props.hi*1.5} data={data}/>
      <EnlargeSide loc='bottom' top='370px' />
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

const SNetwork = connect(mapStateToProps, mapDispatchToProps)(SPNetwork);

export default SNetwork;
