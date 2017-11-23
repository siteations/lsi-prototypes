import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import styles from './materialStyles.js';

import {setSideBottom} from '../action-creators/paneActions.js';

class SBNet extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }


 handleChange = (value) => {
    this.props.setSideBottom(this.props.pane.bottom, value);
  };

 render(){

    return (
    <Tabs
        value={this.props.pane.bottomTab}
        onChange={this.handleChange}
      >
        <Tab label="geo" id="geoTest" value="a" style={this.props.pane.bottomTab==='a' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize} >
            <div style={{height:this.props.hi}}>
            basic geocoding here - 3d as desired
            <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
            </div>
        </Tab>
        <Tab label="discourse" value="b" style={this.props.pane.bottomTab==='b' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize} >
            <div style={{height:this.props.hi}}>
            discourse networks (from metadata)
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
            </div>
        </Tab>
        <Tab label="matter" value="c" style={this.props.pane.bottomTab==='c' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSizeDisabled} disabled={true} >
            <div style={{height:this.props.hi}}>
            materials networks (from research, metadata)
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
            </div>
        </Tab>
        <Tab label="forms" value="d" style={this.props.pane.bottomTab==='d' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSizeDisabled} disabled={true} >
            <div style={{height:this.props.hi}}>
            patterns of influence, adaptation (from research, metadata)
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
    setSideBottom: (type, tab) => {
        dispatch(setSideBottom(type, tab));
    },
  }
}

const SBNetworks = connect(mapStateToProps, mapDispatchToProps)(SBNet);

export default SBNetworks;
