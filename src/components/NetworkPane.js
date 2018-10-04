import React, { Component } from 'react';
import { connect } from 'react-redux';

import {setSideTop} from '../action-creators/paneActions.js';

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
    return (
    <div style={{height:this.props.hi}}>
      networks here: {this.props.nav.siteName} to be reformatted
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

const MNetwork = connect(mapStateToProps, mapDispatchToProps)(MPNetwork);

export default MNetwork;
