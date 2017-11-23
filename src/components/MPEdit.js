import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import styles from './materialStyles.js';


const MPSearch = function (props) {

    console.log(props)

  	return (
  	<Tabs
        value={props.value}
        onChange={props.action}
      >
       <Tab label="" value="a" style={styles.tabText} buttonStyle={styles.tabSize} />

        <Tab label="Log in" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
            log-in/log-out for editing/additions
        </Tab>
       <Tab label="Add Resource" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
            add basic resources
        </Tab>
        <Tab label="Tag Content" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
            tag with custom control vocabularies
        </Tab>
        <Tab label="Editing Tools" value="d" style={styles.tabText} buttonStyle={styles.tabSize}>
						compose/edit visual essays
        </Tab>
        <Tab label="Digital Lessons" value="e" style={styles.tabText} buttonStyle={styles.tabSize}>
            tutorials/help for platform
        </Tab>

    </Tabs>
  	)
};

export default MPSearch;
