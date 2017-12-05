import React, { Component } from 'react';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import styles from './materialStyles.js';
import {white} from 'material-ui/styles/colors';

import {setFullScreen} from '../action-creators/paneActions.js';

class EnlargeFull extends Component {
  constructor(props) {
   super(props);
   this.state = {};
 }

 	expand = ()=>{
 	this.props.setFullScreen(true);
 }

  compress = ()=>{
	this.props.setFullScreen(false);
 }

 render(){

	return (
	        <div>
						{!this.props.pane.fullscreen &&
							<IconButton tooltip="View Full Screen" onClick={this.expand} style={styles.iconFull} >
		            <FontIcon className="fa fa-expand" color={white} />
		          </IconButton>
						}
						{this.props.pane.fullscreen &&
		          <IconButton tooltip="View Regular" onClick={this.compress} style={styles.iconFull} >
		            <FontIcon className="fa fa-compress" color={white} />
		          </IconButton>
	        	}
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
    setFullScreen: (bool) => {
        dispatch(setFullScreen(bool));
    },
  }
}

const EnlargeFullScreen = connect(mapStateToProps, mapDispatchToProps)(EnlargeFull);



export default EnlargeFullScreen;
