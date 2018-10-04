import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import ImagePane  from './ImagePane.js';
import ThemePane  from './ThemePane.js';

import {setSideTop} from '../action-creators/paneActions.js';

var buttons = [
  {label: 'images', value: 'a'},
  {label: 'sites', value: 'b'},
  {label: 'science', value: 'c'},
  {label: 'social', value: 'd'},
  {label: 'senses', value: 'e'},

]


class MPImages extends Component {
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
        <ImagePane />
      }
      {this.props.pane.mainTab==='b' &&
        <ThemePane theme='sites' />
      }
      {this.props.pane.mainTab==='c' &&
        <ThemePane theme='science' />
      }
      {this.props.pane.mainTab==='d' &&
        <ThemePane theme='social' />
      }
      {this.props.pane.mainTab==='e' &&
        <ThemePane theme='sense' />
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

const MImages = connect(mapStateToProps, mapDispatchToProps)(MPImages);

export default MImages;
