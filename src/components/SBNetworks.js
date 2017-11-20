import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import styles from './materialStyles.js';


const SBNetworks = function (props) {

    console.log(props.actions)

    return (
    <Tabs
        value={props.value}
        onChange={props.action}
      >
        <Tab label="geo" id="imgTest" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            basic geocoding here - 3d as desired
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="texts" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            discourse networks (from metadata)
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="matter" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            materials networks (from research, metadata)
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="forms" value="d" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            patterns of influence, adaptation (from research, metadata)
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="elements" value="e" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            actual site analysis (from research, new layers)
                <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>

    </Tabs>
    )
};

export default SBNetworks;
