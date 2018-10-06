import React, { Component } from 'react';
import { connect } from 'react-redux';

import Waypoint from 'react-waypoint';

import {setUpdate} from '../action-creators/navActions.js';

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
  var section = '999'
  if (this.props.nav.paraN){section = this.props.nav.paraN};
  this.scrollTo(section +'-section');
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
  var resources = null;
  if (this.props.res.resourcesSelect){
    resources = Object.keys(this.props.res.resourcesSelect).map(key=>{
      var obj = this.props.res.resourcesSelect[key];
      obj.id = key;
      return obj;
    })
    console.log('resources', resources);
  }
  	//var chapter = this.props.nav.chp;
  	var name = this.props.nav.text[this.props.nav.chp].titles;

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
            {resources.length < 1 &&
              <div className='row' >
                          <div className= 'col-3 small ' />
                          <div className="col-9 cursor" onClick={e=>this.returnToText()} >
                          <p>Sorry, resources not yet extracted for this chapter's text. Click to return to main text.</p>
                        </div>
              </div>

            }
            {resources !== null &&
              resources.map((items, i)=>{
               return (
                       <div className='row' id={i + '-section'} ref={i + '-section'} >
                       <div className= 'col-3 small' />
                       <div className= 'col-9' >
                         <em><h5>{items.title}</h5></em>
                          <ul>
                            <li>author: {(items.creators[0])? items.creators[0].lastName: null} ;
                            publication: {(items.place && items.publisher && items.date)? items.publisher +': '+ items.place + ' ('+ items.date + ')' : null} ;</li>
                            <li><a href={items.url} target='_blank'>Go to digital text</a></li>
                            <li>Future adaptations: reader in full-screen view (see student prototyping ideas) </li>
                            </ul>
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
    res: state.res,
    site: state.site,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUpdate: (bool) =>{
    	dispatch(setUpdate(bool));
    },
    setPanesTabs: (a,b,c)=>{
      dispatch(setPanesTabs(a,b,c));
    }

  }
}

const TextPane = connect(mapStateToProps, mapDispatchToProps)(ResourcePane);


export default TextPane;
