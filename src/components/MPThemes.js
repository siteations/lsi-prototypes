import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import styles from './materialStyles.js';


const MPThemes = function (props) {

    console.log(props)

    return (
    <Tabs
        value={props.value}
        onChange={props.action}
      >
       <Tab label="" value="a" style={styles.tabText} buttonStyle={styles.tabSize} />

        <Tab label="Sites" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
            full text search results
        </Tab>
       <Tab label="Social" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
            theme search query results
        </Tab>
        <Tab label="Science" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
            index search results
        </Tab>
        <Tab label="Sense" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
            index search results
        </Tab>

    </Tabs>
    )
};

export default MPThemes;
