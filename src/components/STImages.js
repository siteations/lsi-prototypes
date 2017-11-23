import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import styles from './materialStyles.js';

import {setSideTop} from '../action-creators/paneActions.js';

class STImg extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }


 handleChange = (value) => {
    console.log(this.props.setSideTop, this.props.pane.top, value)
    this.props.setSideTop(this.props.pane.top, value);
  };

 render(){


    return (
    <Tabs
        value={this.props.pane.topTab}
        onChange={this.handleChange} //update this to handle tabs
        inkBarStyle={styles.inkBarSm}
      >
        <Tab label="images"  value="a" style={this.props.pane.topTab==='a' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize}>
                    <div style={{height:this.props.hi}}>
                    image slider here
                        <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                          <FontIcon className="fa fa-plus" />
                        </IconButton>
                    </div>
                </Tab>

        <Tab label="Sites" value="b" style={this.props.pane.topTab==='b' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:this.props.hi}}>
            site themes here  (conditional)
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
            </div>
        </Tab>
        <Tab label="Science" value="c" style={this.props.pane.topTab==='c' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:this.props.hi}}>
            science themes here  (conditional)
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
            </div>
        </Tab>
        <Tab label="Social" value="d" style={this.props.pane.topTab==='d' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:this.props.hi}}>
            social themes here  (conditional)
                <IconButton tooltip="View Large" onClick={this.props.actions} style={styles.iconPlus} >
                  <FontIcon className="fa fa-plus" />
                </IconButton>
            </div>
        </Tab>
        <Tab label="Senses" value="e" style={this.props.pane.topTab==='e' ? styles.tabTextActive : styles.tabText} buttonStyle={styles.tabSizeDisabled} disabled={true} >
            <div style={{height:this.props.hi}}>
            senses themes here  (conditional)
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
  }
}

const STImages = connect(mapStateToProps, mapDispatchToProps)(STImg);

export default STImages;
