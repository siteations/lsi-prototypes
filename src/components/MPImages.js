import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import styles from './materialStyles.js';


const MPImages = function (props) {

    console.log(props)

  	return (
  	<Tabs
        value={props.value}
        onChange={props.action}
      >
       <Tab label="" value="a" style={styles.tabText} buttonStyle={styles.tabSize} />

        <Tab label="Images" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
            image slider here
        </Tab>
        <Tab label="Sites" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
						site themes here (conditional)
        </Tab>
        <Tab label="Science" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
          	science themes here  (conditional)
        </Tab>
        <Tab label="Social" value="d" style={styles.tabText} buttonStyle={styles.tabSize}>
            social themes here  (conditional)
        </Tab>
        <Tab label="Senses" value="e" style={styles.tabText} buttonStyle={styles.tabSize}>
            sensory themes here  (conditional)
        </Tab>

    </Tabs>
  	)
};

export default MPImages;
