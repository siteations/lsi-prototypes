import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as d3 from "d3";

import PaneContents from './ContentsM.js';

import {setMainPane, setFullScreen} from '../action-creators/paneActions.js';

//network test only
// const getData = ()=>{
//   var range = Math.floor(100*Math.random());
//   var data = {
//               nodes:d3.range(0, range).map(function(d){ return {label: "node "+d ,r:~~d3.randomUniform(8, 28)()}}),
//               links:d3.range(0, range).map(function(){
//                 var s = ~~d3.randomUniform(range)(), t = ~~d3.randomUniform(range)();
//                 return {label: "connects "+s+':'+t, source:s, target:t} })
//           };

//   return data;
// }



class CoreP extends Component {
	constructor(props) {
    super(props);
    this.state = {
      update: false
    };
    // this.handleChange=this.handleChange.bind(this)
    this.closeFull=this.closeFull.bind(this)
  }

  // handleChange = (value) => {
  //   this.props.setMainPane(this.props.pane.main, value); //master state
  // };

  closeFull(){
    this.setState({update:!this.state.update});
  }



  render() {
    //var data = getData();

    console.log('check on pane, functions', this.props, this.state)

  	return (
  	<div className="col paneFull" id="largePane" onClick="" >
	  		<PaneContents action={this.handleChange} size="full" />
      {/*
        <TestPane data={data} />
      */}
    </div>
  	)
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMainPane: (type, tab) => {
        dispatch(setMainPane(type, tab));
    },
    setFullScreen: (bool)=>{
      dispatch(setFullScreen(bool));
    }

  }
}

const CorePane = connect(mapStateToProps, mapDispatchToProps)(CoreP);

export default CorePane;
