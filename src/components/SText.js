import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import TextPaneS from './TextPaneS.js';
import ResourcePaneS from './ResourcePaneS.js';


var buttons = [
  {label: 'text', value: 'a'},
  {label: 'notes', value: 'b'},
  {label: 'resources', value: 'c'},
]


class SText extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }


 handleChange = (value) => {
    console.log(this.props.setSideTop, this.props.pane.top, value)
    if (this.props.loc==='top'){
        this.props.setSideTop(this.props.pane.top, value);
    } else if (this.props.loc==='bottom'){
        this.props.setSideBottom(this.props.pane.bottom, value);
    }
  };

  render(){

    var loc = this.props.loc+'Tab';

    return (
    <div>

      <Tabs buttons={buttons} placement={this.props.loc} />

      <div>
      {this.props.pane[loc]==='a' &&
        <TextPaneS output="text" placement={this.props.loc} hi={this.props.hi} />
      }
      {this.props.pane[loc]==='b' &&
        <TextPaneS output="note" placement={this.props.loc} hi={this.props.hi} />
      }
      {this.props.pane[loc]==='c' &&
        <ResourcePaneS placement={this.props.loc} hi={this.props.hi} />
      }
      </div>
    </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    }
}

const STText = connect(mapStateToProps, null)(SText);

export default STText;
