import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import LogPane  from './TextPane.js';
import EditPane  from './TextPane.js';
import ToolPane  from './TextPane.js';
import LessonPane  from './TextPane.js';

import {setSideTop} from '../action-creators/paneActions.js';

var buttons = [
  {label: 'log-in', value: 'a'},
  {label: 'add', value: 'b'},
  {label: 'edit', value: 'c'},
  {label: 'tools', value: 'd'},
  {label: 'lesson', value: 'e'},

]


class MPEdit extends Component {
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
        <LogPane />
      }
      {this.props.pane.mainTab==='b' &&
        <EditPane focus='add' />
      }
      {this.props.pane.mainTab==='c' &&
        <EditPane focus='tags' />
      }
      {this.props.pane.mainTab==='d' &&
        <ToolPane />
      }
      {this.props.pane.mainTab==='e' &&
        <LessonPane />
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

const MEdit = connect(mapStateToProps, mapDispatchToProps)(MPEdit);

export default MEdit;




