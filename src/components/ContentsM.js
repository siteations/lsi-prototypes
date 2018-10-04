import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from './Tabs.js';

import TextPane  from './TextPane.js';
import ResourcePane from './ResourcePane.js';

import ImagePane  from './ImagePane.js';
import ThemePane  from './ThemePane.js';

import GeoPane  from './GeoPane.js';
import NetworkPane  from './TextPane.js'; //rework the fake network component

import {setSideTop} from '../action-creators/paneActions.js';


var buttonsT = [
  {label: 'text', value: 'a'},
  {label: 'notes', value: 'b'},
  {label: 'resources', value: 'c'}
]

var buttonsI = [
  {label: 'images', value: 'a'},
  {label: 'sites', value: 'b'},
  {label: 'science', value: 'c'},
  {label: 'social', value: 'd'},
  {label: 'senses', value: 'e'},

]

var buttonsG = [
  {label: 'geo', value: 'a'},
  {label: 'discourse', value: 'b'},
  {label: 'matter', value: 'c'},
  {label: 'forms', value: 'd'}
]

class MPT extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }


  componentDidMount(){
   //console.dir(document.getElementById('sidePane').clientWidth)
   var wide = document.getElementById('largePane').clientWidth
   var height = wide*.69 - 37

   this.setState({width: wide, height})
 }

    render(){
    var paneClass = (this.props.pane.fullscreen)? 'scrollPaneLF': 'scrollPaneL' ;
    var buttons = (this.props.pane.main==='text')? buttonsT : (this.props.pane.main==='images')? buttonsI : buttonsG ;

  	return (
    <div>

      <Tabs buttons={buttons} placement='main' />

      <div className={paneClass} >

    {/*TEXTUAL SERIES*/}
      {this.props.pane.mainTab==='a' && this.props.pane.main==='text' &&
        <TextPane output="text"/>
      }
      {this.props.pane.mainTab==='b' && this.props.pane.main==='text' &&
        <TextPane output="note"/>
      }
      {this.props.pane.mainTab==='c' && this.props.pane.main==='text' &&
        <ResourcePane />
      }

      {/*IMAGES SERIES*/}
      {this.props.pane.mainTab==='a' && this.props.pane.main==='images' &&
        <ImagePane />
      }
      {this.props.pane.mainTab==='b' && this.props.pane.main==='images' &&
        <ThemePane theme='sites' />
      }
      {this.props.pane.mainTab==='c' && this.props.pane.main==='images' &&
        <ThemePane theme='science' />
      }
      {this.props.pane.mainTab==='d' && this.props.pane.main==='images' &&
        <ThemePane theme='social' />
      }
      {this.props.pane.mainTab==='e' && this.props.pane.main==='images' &&
        <ThemePane theme='sense' />
      }

      {/*NETWORKS SERIES*/}
      {this.props.pane.mainTab==='a' && this.props.pane.main==='networks' &&
        <GeoPane hi={this.state.height} scale='generic'/>
      }
      {this.props.pane.mainTab==='b' && this.props.pane.main==='networks' &&
        <NetworkPane focus='discourse' />
      }
      {this.props.pane.mainTab==='c' && this.props.pane.main==='networks' &&
        <NetworkPane focus='matter' />
      }
      {this.props.pane.mainTab==='d' && this.props.pane.main==='networks' &&
        <NetworkPane focus='form' />
      }

      {/*EDITORS SERIES OUT FOR NOW*/}


      </div>
    </div>
  	)
  }
}

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

const PaneContents = connect(mapStateToProps, mapDispatchToProps)(MPT);

export default PaneContents;
