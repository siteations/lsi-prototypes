import React, { Component } from 'react';
import { connect } from 'react-redux';

import EnlargeSide from './EnlargeSide.js';

import {setSideTop} from '../action-creators/paneActions.js';


class Themes extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }



    render(){

    return (
    <div style={{height:this.props.hi}}>
      {this.props.theme} text here: {this.props.nav.siteName}
      <EnlargeSide loc={this.props.placement} />
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

const ThemePaneS = connect(mapStateToProps, mapDispatchToProps)(Themes);

export default ThemePaneS;
