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

        <Tab label="Search Full-Text" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
            full text search results
        </Tab>
       <Tab label="Search Themes" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
            theme search query results
        </Tab>
        <Tab label="Search Index" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
						index search results
        </Tab>

    </Tabs>
  	)
};

export default MPSearch;
