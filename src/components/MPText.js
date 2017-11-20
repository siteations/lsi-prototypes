import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import TextPane  from './TextPane.js';
import NotePane  from './NotePane.js';
import ResourcePane from './ResourcePane.js';

import styles from './materialStyles.js';


const MPText = function (props) {

    console.log(props)

  	return (
  	<Tabs
        value={props.value}
        onChange={props.action}
      >
       <Tab label="" value="a" style={styles.tabText} buttonStyle={styles.tabSize} />

        <Tab label="Text" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
            <TextPane />
        </Tab>
        <Tab label="Notes" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
						<NotePane />
        </Tab>
        <Tab label="Resources" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
          	<ResourcePane />
        </Tab>

    </Tabs>
  	)
};

export default MPText;
