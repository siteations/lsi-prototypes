import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import {grey400, grey600, white} from 'material-ui/styles/colors';


import styles from './materialStyles.js';


const LogAccess = function (props) {

    console.log(props)

  	return (
      <div className="row" style={{backgroundColor:grey400}}>

          <FlatButton label="log-in" style={styles.tabSize} value="a" onChange={props.action} />


          <FlatButton label="add"  style={styles.tabSize} value="b" onChange={props.action} />


          <FlatButton label="edit"  style={styles.tabSize} value="c" onChange={props.action} />


          <FlatButton label="tools"  style={styles.tabSize} value="d" onChange={props.action} />


          <FlatButton label="lessons"  style={styles.tabSize} value="e" onChange={props.action} />

      </div>

  	)
};

export default LogAccess;
