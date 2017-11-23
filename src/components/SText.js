import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';


import styles from './materialStyles.js';


import {setSideTop, setSideBottom} from '../action-creators/paneActions.js';

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

  	return (
  	<Tabs
        value={(this.props.loc==='top')? this.props.pane.topTab: this.props.pane.bottomTab}
        onChange={this.handleChange}
      >
         <Tab label="Text" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
         <div style={{height:this.props.hi}}>
            just core text (no footnotes)
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
        </div>
        </Tab>
        <Tab label="Notes" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
        <div style={{height:this.props.hi}}>
						simple number notes
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
        </div>
        </Tab>
        <Tab label="Resources" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
        <div style={{height:this.props.hi}}>
          	resources table
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
        </div>
        </Tab>

    </Tabs>
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
    setSideTop: (type, tab) => {
        dispatch(setSideTop(type, tab));
    },
        setSideBottom: (type, tab) => {
        dispatch(setSideBottom(type, tab));
    },
  }
}

const STText = connect(mapStateToProps, mapDispatchToProps)(SText);

export default STText;
