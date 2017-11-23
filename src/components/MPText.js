import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';

import TextPane  from './TextPane.js';
import NotePane  from './NotePane.js';
import ResourcePane from './ResourcePane.js';

import styles from './materialStyles.js';

import {setSideTop} from '../action-creators/paneActions.js';

class MPT extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }



    render(){
  	return (
  	<Tabs
        value={this.props.pane.mainTab}
        onChange={this.props.action}
        inkBarStyle={styles.inkBar}
      >
       <Tab label="" value="a" style={styles.tabText} buttonStyle={styles.tabSize} />

        <Tab label="Text" value="a" style={this.props.pane.mainTab==='a' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize}>
            <TextPane />
        </Tab>
        <Tab label="Notes" value="b" style={this.props.pane.mainTab==='b' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize}>
						<NotePane />
        </Tab>
        <Tab label="Resources" value="c" style={this.props.pane.mainTab==='c' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize}>
          	<ResourcePane />
        </Tab>

    </Tabs>
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

const MPText = connect(mapStateToProps, mapDispatchToProps)(MPT);

export default MPText;
