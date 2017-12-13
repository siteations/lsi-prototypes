import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import TextPane  from './TextPane.js';
//import TextPane  from './TextP.js';
import NotePane  from './NotePane.js';
import ResourcePane from './ResourcePane.js';

import {setSideTop} from '../action-creators/paneActions.js';


var buttons = [
  {label: 'text', value: 'a'},
  {label: 'notes', value: 'b'},
  {label: 'resources', value: 'c'}
]

class MPT extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }



    render(){
  	return (
    <div>

      <Tabs buttons={buttons} placement='main' />

      <div className='scrollPaneL' >
      {this.props.pane.mainTab==='a' &&
        <TextPane />
      }
      {this.props.pane.mainTab==='b' &&
        <NotePane />
      }
      {this.props.pane.mainTab==='c' &&
        <ResourcePane />
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

const MTText = connect(mapStateToProps, mapDispatchToProps)(MPT);

export default MTText;
