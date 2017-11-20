import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import styles from './materialStyles.js';


const STImages = function (props) {



    return (
    <Tabs
        value={props.value}
        onChange={props.action}
      >
        <Tab label="Images" id="imgTest" value="a" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            image slider here
                            <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="Sites" value="b" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            site themes here  (conditional)
                            <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="Science" value="c" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            science themes here  (conditional)
                            <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="Social" value="d" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            social themes here  (conditional)
                            <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>
        <Tab label="Senses" value="e" style={styles.tabText} buttonStyle={styles.tabSize}>
            <div style={{height:props.hi}}>
            senses themes here  (conditional)
                            <FloatingActionButton mini={true} onClick={props.actions} style={{float:'right', margin: 5}}>
                  <ContentAdd />
                </FloatingActionButton>
            </div>
        </Tab>

    </Tabs>
    )
};

export default STImages;
