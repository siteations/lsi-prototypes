import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import ImagePane  from './ImagePaneS.js';
import ThemePane  from './ThemePaneS.js';


var buttons = [
  {label: 'images', value: 'a'},
  {label: 'sites', value: 'b'},
  {label: 'science', value: 'c'},
  {label: 'social', value: 'd'},
  {label: 'senses', value: 'e'},

]


class SImage extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }

    render(){
    return (
    <div>

      <Tabs buttons={buttons} placement='top' />

      <div >
      {this.props.pane.topTab==='a' &&
        <ImagePane hi={this.props.hi} loc='top' />
      }
      {this.props.pane.topTab==='b' &&
        <ThemePane theme='sites' hi={this.props.hi} loc='top' />
      }
      {this.props.pane.topTab==='c' &&
        <ThemePane theme='science' hi={this.props.hi} loc='top' />
      }
      {this.props.pane.topTab==='d' &&
        <ThemePane theme='social' hi={this.props.hi} loc='top' />
      }
      {this.props.pane.topTab==='e' &&
        <ThemePane theme='sense' hi={this.props.hi} loc='top' />
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

const SImages = connect(mapStateToProps, null)(SImage);

export default SImages;

