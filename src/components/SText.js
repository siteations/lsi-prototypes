import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import styles from './materialStyles.js';


const MText = function (props) {

    console.log(props)

  	return (
  	<Tabs
        value={props.value}
        onChange={props.action}
      >
         <Tab label="Text" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
         <div style={{height:props.hi}}>
            just core text (no footnotes)
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
        </div>
        </Tab>
        <Tab label="Notes" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
        <div style={{height:props.hi}}>
						simple number notes
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
        </div>
        </Tab>
        <Tab label="Resources" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
        <div style={{height:props.hi}}>
          	resources table
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
        </div>
        </Tab>

    </Tabs>
  	)
};

export default MText;
