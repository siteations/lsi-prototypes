import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import MPText from './MPText.js';
import MPImages from './MPImages.js';
import MPSearch from './MPSearch.js';

class CorePane extends Component {
	constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      type: 'text',
    };
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };



  render() {

  	return (
  	<div className="col-8 pane" id="largePane">
	  	{this.state.type === 'text' &&
	  		<MPText value={this.state.value} action={this.handleChange} />
	  	}
	  	{this.state.type === 'search' &&
	  		<MPSearch value={this.state.value} action={this.handleChange} />
	  	}
	  	{this.state.type === 'images' &&
	  		<MPImages value={this.state.value} action={this.handleChange} />
	  	}
	  	{this.state.type === 'networks' &&
	  		<div />
	  	}
	  	{this.state.type === 'edits' &&
	  		<div />
	  	}
    </div>
  	)
  }
};

export default CorePane;
