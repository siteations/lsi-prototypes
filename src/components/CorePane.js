import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';

import MPText from './MPText.js';
import MPImages from './MPImages.js';


import {setMainPane} from '../action-creators/paneActions.js';

class CoreP extends Component {
	constructor(props) {
    super(props);
    this.state = {};
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange = (value) => {
    this.props.setMainPane(this.props.pane.main, value); //master state
  };



  render() {

    console.log('check on pane, functions', this.props, this.state)

  	return (
  	<div className="col-8 pane" id="largePane">
	  	{this.props.pane.main === 'text' &&
	  		<MPText value={this.props.pane.mainTab} action={this.handleChange} />
	  	}
	  	{this.props.pane.main === 'images' &&
	  		<MPImages value={this.props.pane.mainTab} action={this.handleChange} />
	  	}
	  	{this.props.pane.main === 'networks' &&
	  		<div>
        networks here
        </div>
	  	}
	  	{this.props.pane.main === 'edits' &&
	  		<div>
        editting interface here
        </div>
	  	}
    </div>
  	)
  }
};

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

  }
}

const CorePane = connect(mapStateToProps, mapDispatchToProps)(CoreP);

export default CorePane;
