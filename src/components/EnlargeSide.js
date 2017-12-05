import React, { Component } from 'react';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import styles from './materialStyles.js';

import {setMainPane, setSideBottom, setSideTop} from '../action-creators/paneActions.js';

class EnlargeS extends Component {
  constructor(props) {
   super(props);
   this.state = {};
 }

 togglePaneT = () => {

  var topNext = this.props.pane.main, topTabN = this.props.pane.mainTab ;
  var mainNext = this.props.pane.top, mainTabN = this.props.pane.topTab ;

  this.props.setSideTop(topNext, topTabN);
  this.props.setMainPane(mainNext, mainTabN);
}

 togglePaneB = () => {

  var bottomNext = this.props.pane.main, bottomTabN = this.props.pane.mainTab ;
  var mainNext = this.props.pane.bottom, mainTabN = this.props.pane.bottomTab ;

  this.props.setSideBottom(bottomNext, bottomTabN);
  this.props.setMainPane(mainNext, mainTabN);
}

 render(){

	return (
          <IconButton tooltip="View Large" onClick={(this.props.loc==='top')? this.togglePaneT : this.togglePaneB } style={styles.iconPlus} >
            <FontIcon className="fa fa-plus" />
          </IconButton>
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
    setMainPane: (type, tab) => {
        dispatch(setMainPane(type, tab));
    },
    setSideBottom: (type, tab) => {
    	dispatch(setSideBottom(type,tab));
    },
    setSideTop: (type, tab) => {
    	dispatch(setSideTop(type,tab));
    }
  }
}

const EnlargeSide = connect(mapStateToProps, mapDispatchToProps)(EnlargeS);

export default EnlargeSide;
