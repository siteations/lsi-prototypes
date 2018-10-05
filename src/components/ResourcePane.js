import React, { Component } from 'react';
import { connect } from 'react-redux';

import Waypoint from 'react-waypoint';

import {setChapterDrawer, setChpPara, setSiteData, setUpdate, setChpParaN} from '../action-creators/navActions.js';

import {setPanesTabs} from '../action-creators/paneActions.js';

//this should work such that the nav bar 'onClick', pulls in the text for a specific chapter and the scroll-to-id for subsections and/or case studies (dispatch to overall store)

//that chapter object holds and array of paragraph objects and/or subheader objects which also note footnotes, original pages, site tags, people tags, images, captions, etc.

//should have a setting that then loads the images, geo information - default first in the top paragraph or on clicking on the case study.... so automate the side loading (dispatch to overall store)... so a scroll spy and direct click launch of that information.

class ResourcePane extends Component {
  constructor(props) {
   super(props);
   this.state = {
    footnote: '',
    site: '',
    scroll: 0,
    topOffset: 0,
    inView:[]
   }// defer definitions
 }

 componentDidMount(){
  this.setState({topOffset:document.getElementById('largePane').offsetParent.offsetTop})
  this.scrollTo(this.props.nav.para+'-section');
}

 //-----------------------return from resources, notes------------------------

 returnToText(){
  this.props.setPanesTabs('main','text','a');
  this.props.setUpdate(true);
  console.log('return to text')
}

scrollTo(value){
 this.refs[value].scrollIntoView({block: 'start', behavior: 'instant'});
}



render() {
  	//var chapter = this.props.nav.chp;
  	var name = this.props.nav.text[this.props.nav.chp].titles;
    var resources = this.props.nav.text[this.props.nav.chp].paragraphs.map(item=>item.resources);
    console.log('resources', resources);

    return (
            <div>
            <div className='row' ref={'999-section'}>
            <div className= 'col-3 small'>
            </div>
            <div className= 'col-9 small'>
            <h3 className='p10'>resources: {name.title}</h3>
            <h5>{name.subtitle}</h5>
            </div>
            </div>
            {resources &&
              resources.map((items, i)=>{
               return (
                       <div className='row' id={i + '-section'} ref={i + '-section'} >
                       <div className= 'col-3 small' />
                       <div className= 'col-9' >
                       {/*i=== 0 || !items &&
                        <span />
                      */}
                      {items && i!==0 &&
                        items.map((element, j)=>{
                          return (
                                  <span className="p10s"><em><h5>{element.value}</h5></em>
                                  secondary links here
                                  </span>
                                  )
                        })
                      }
                      </div>
                      </div>
                      )
             })

            }
            </div>
            );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    resources: state.refer,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // setChapterDrawer: (button) => {
    //     dispatch(setChapterDrawer(button));
    // },
    // setChpPara: (chp, para) => {
    //     dispatch(setChpPara(chp, para));
    // },
    // setChpParaL: (para) => {
    //     dispatch(setChpParaL(para));
    // },
    // setSiteData: (id, name)=>{
    // 	dispatch(setSiteData(id, name));
    // },
    // setUpdate: (bool) =>{
    // 	dispatch(setUpdate(bool));
    // },
    // setPanesTabs: (a,b,c)=>{
    //   dispatch(setPanesTabs(a,b,c));
    // }

  }
}

const TextPane = connect(mapStateToProps, mapDispatchToProps)(ResourcePane);


export default TextPane;
