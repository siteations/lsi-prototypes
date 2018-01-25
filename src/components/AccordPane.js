import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './materialStyles.js';

import SImage from './SImage.js';
import SNetwork from './SNetwork.js';
import SText from './SText.js';
import LogAccess from './LogAccess.js';

import {setMainPane, setSideTop, setSideBottom} from '../action-creators/paneActions.js';

//drop-down toggles to hold nested info
//when clicked should open drawer to allow futher subselection

class SideP extends Component {
  constructor(props) {
   super(props);
   this.state = {
   width:0,
   height:0,
   };
   this.togglePaneT= this.togglePaneT.bind(this);
   this.togglePaneB= this.togglePaneB.bind(this);
 }

 componentDidMount(){
   //console.dir(document.getElementById('sidePane').clientWidth)
   var wide = document.getElementById('sidePane').clientWidth
   var height = wide*.75 - 32

   this.setState({width: wide, height})
 }

 togglePaneT = () => {

  var topNext = this.props.pane.main, topTabN = this.props.pane.mainTab ;
  var mainNext = this.props.pane.top, mainTabN = this.props.pane.topTab ;

  this.props.setSideTop(topNext, topTabN);
  this.props.setMainPane(mainNext, mainTabN);


};

 togglePaneB = () => {

  var bottomNext = this.props.pane.main, bottomTabN = this.props.pane.mainTab ;
  var mainNext = this.props.pane.bottom, mainTabN = this.props.pane.bottomTab ;

  this.props.setSideBottom(bottomNext, bottomTabN);
  this.props.setMainPane(mainNext, mainTabN);

};

  render() {

  console.log(this.state.height);

    return (
              <div className="col pane" id="sidePane">
                {this.props.pane.top === 'images' &&
                  <SImage hi={this.state.height} actions={this.togglePaneT} />
                }
                {this.props.pane.top === 'text' &&
                  <SText hi={this.state.height} loc='top' actions={this.togglePaneT} />
                }
                {this.props.pane.bottom === 'networks' &&
                  <SNetwork hi={this.state.height} actions={this.togglePaneB} />
                }
                {this.props.pane.bottom === 'text' &&
                  <SText hi={this.state.height} loc='bottom' actions={this.togglePaneB} />
                }
                <LogAccess />
              </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMainPane: (type, tab) => {
        dispatch(setMainPane(type, tab));
    },
    setSideTop: (type, tab) => {
        dispatch(setSideTop(type, tab));
    },
    setSideBottom: (type, tab) => {
        dispatch(setSideBottom(type, tab));
    },

  }
}

const SidePane = connect(mapStateToProps, mapDispatchToProps)(SideP);

export default SidePane;
