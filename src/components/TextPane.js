import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import XMLToReact from '@condenast/xml-to-react';
import axios from 'axios';

import SideLinks from './SideLinks.js';

import Waypoint from 'react-waypoint';

import {setChapterDrawer, setChpPara, setUpdate, setChpParaN} from '../action-creators/navActions.js';
import {setSiteData} from '../action-creators/siteActions.js';
import {loadResources, loadTags, setSelResources} from '../action-creators/resActions.js';
import {setPanesTabs} from '../action-creators/paneActions.js';
import {activateGallery, loadGallery} from '../action-creators/imgActions.js';
import {setAgentData} from '../action-creators/agentActions.js';


//this should work such that the nav bar 'onClick', pulls in the text for a specific chapter and the scroll-to-id for subsections and/or case studies (dispatch to overall store)

//that chapter object holds and array of paragraph objects and/or subheader objects which also note footnotes, original pages, site tags, people tags, images, captions, etc.

//should have a setting that then loads the images, geo information - default first in the top paragraph or on clicking on the case study.... so automate the side loading (dispatch to overall store)... so a scroll spy and direct click launch of that information.

class Text extends Component {
  constructor(props) {
   super(props);
   this.state = {
   	footnote: '',
   	site: '',
   	scroll: 0,
   	topOffset: 0,
   	inView:[]
   }// defer definitions
   this.handleNote=this.handleNote.bind(this);
   this.handleRes=this.handleRes.bind(this);
   this.handleSite=this.handleSite.bind(this);
   this.insertHtmlNote = this.insertHtmlNote.bind(this);
   this.returnToText= this.returnToText.bind(this);

   this.textRef = null;
   this.setTextRef = element => {
      this.textRef = element;
    };
 }

 	componentDidMount(){
 		this.setState({topOffset:document.getElementById('largePane').offsetParent.offsetTop})
    //resource list, figure list tapping
 	}

 	shouldComponentUpdate(nextProps, nextState){
    var test = (this.props.nav.text !== nextProps.nav.text || this.props.pane.mainTab !== nextProps.pane.mainTab || (this.props.site.siteName !== nextProps.site.siteName && this.props.nav.para !== nextProps.nav.para && this.props.nav.paraN !== nextProps.nav.paraN) || this.props.nav.chp !== nextProps.nav.chp)
    //console.log('update?', test, this.props.nav.setUp )
 		return test || this.props.nav.setUp;
 	}

  componentDidUpdate(){

    if (this.props.nav.para!==0 && (this.props.pane.mainTab ==='a')){
      this.props.setUpdate(false);
   	  this.scrollTo(this.props.nav.para+'-section')
    } else if (this.props.nav.paraN!==0 && this.props.pane.mainTab ==='b'){
      this.props.setUpdate(false);
      var n = 999;
      (this.props.nav.paraN)? n = this.props.nav.paraN : null;
      this.scrollTo(this.props.nav.paraN+'-section')
    } else { //so what are these conditions
      this.props.setUpdate(false);
      this.scrollTo('999-section')
    }
  }

  //-----------------------side actions to pass down------------------------
  handleNote(value, i){
    var noteP = value-1;
    var regP = i;

    this.props.setChpParaN(noteP);
    this.props.setPanesTabs('main','text','b');
    this.props.setChpPara(this.props.nav.chp, regP);
    this.props.setUpdate(true);
  }

  //update to handle the actual paragraph alignment
  handleRes(value, i){
    var noteP = Object.keys(this.props.res.resourcesSelect).indexOf(value);
    var regP = i;

    this.props.setChpParaN(noteP);
    this.props.setPanesTabs('main','text','c');
    this.props.setChpPara(this.props.nav.chp, regP);
    this.props.setUpdate(true);
  }

  handleSite(value, id, name){
  	this.props.setChpPara(this.props.nav.chp, value);
  	this.props.setSiteData(id, name);
    var figs = this.props.site.allSitesImg[id].options;
    if (figs.length>0){
      this.props.loadGallery(figs, 'site');
    }
  	this.props.setUpdate(false);
  }


  handleAgent(value, id, name){ //set up for mapping the network diagram
    var agent = this.props.agent.allAgents[id];
    this.props.setChpPara(this.props.nav.chp, value); //just to update page
    this.props.setAgentData(id, agent.name[0]);
    this.props.setPanesTabs('bottom','networks','b');
    this.props.setUpdate(false);
  }
//-----------------------return from resources, notes------------------------

  returnToText(){
    this.props.setPanesTabs('main','text','a');
    this.props.setUpdate(true);
  }

//-----------------------scroll tracking------------------------
/*
  scrollEnter(e){
    var here=e.id.replace('-section', '');

    let view=this.state.inView;
    view.push(parseInt(here, 10));

    var topSitePara = view.filter(para=>this.props.nav.text[this.props.nav.chp].paragraphs[para].site !== null);
    var para = (view[0]<view[1] || view.length===1)? this.props.nav.text[this.props.nav.chp].paragraphs[topSitePara[0]] : this.props.nav.text[this.props.nav.chp].paragraphs[topSitePara[topSitePara.length-1]];

    //console.log(para);
    var site = (para !== undefined && para.sites !== null)? para.sites[0] : null;

    if (site){
      this.props.setUpdate(false);
      this.props.setSiteData(site.id, site.value);
    }

    this.setState({inViewSite:view});
    this.setState({inView:view});

  }

  scrollLeave(e){
    let view=this.state.inView;
    view.splice(view.indexOf(parseInt(e.id.replace('-section', ''), 10)), 1);
    this.setState({inView:view});
  }
*/

  scrollTo(value){
   this.refs[value].scrollIntoView({block: 'start', behavior: 'instant'});
  }

//-----------------------html insertions------------------------

  insertHtml(a){
    //return {__html: this.minusFigures(this.props.nav.text[this.props.nav.chp].paragraphs[a].text)};

    //alternate for adding to props and using xml live
    const xmlToReact = new XMLToReact({
      p: (attrs) => ({ type: 'p'}),
      name: (attrs) => {
        (attrs.type==='pname' || attrs.subtype==='site') ? attrs.className = 'cursor' : null;
        (attrs.subtype==='site') ?  attrs.onClick = e=>this.handleSite(a, attrs.target, null): null;
        //(attrs.type='pname') ? null : null; //handle agents later
        (attrs.type==='pname') ? attrs.onClick = e=>this.handleAgent(a, attrs.target, null) : null;
        return ({ type: 'name', props: attrs })
      },
      hi: (attrs) => { //reference location
        (attrs.target) ? attrs.onClick = e=>this.handleRes(attrs.target , a): null;
        (attrs.target) ? attrs.className = 'cursor' : null;
        return ({ type: 'hi', props: attrs })
      },
      ref: (attrs) => { //example of new integrations, adding note and res functions
          attrs.onClick = e=>this.handleNote(attrs.target.replace('#CH7-n',''), a);
          attrs.className = 'cursor';
          return ({ type: 'ref', props: attrs })
      },
      date: (attrs) => ({ type: 'date', props:{style:{fontStyle: 'italic'}}})
    });

    const reactTree = xmlToReact.convert(this.props.nav.text[this.props.nav.chp].paragraphs[a].text);
    return reactTree;

  }

  print(){
    var printContent = document.querySelector('#containerElement');
    var printMe = window.open('', '', 'width=900,height=650');
    printMe.document.write(printContent.innerHTML);
    printMe.document.close();
    printMe.focus();
    printMe.print();
    printMe.close();
  }

  loadGalleryContents(figOptArr, type){ //only on current click
    console.log('got array of images', figOptArr.length );
    this.props.loadGallery(figOptArr, type);
  }

  insertFig(fig, a){
    var figure = this.props.img.allFig[fig.figId];
    var image = {};
    (figure.match)? image.url = figure.match.graphic : (figure.zoteroURL)? image.url = figure.zoteroURL : null;

    //needs update for rotation css;

    if (image.url && !figure.options ){
      return (
              <div className='fig'>
                <img className={(figure.rotate)? 'rotate' : ''} src={image.url} alt={fig.figDesc} style={{width:'95%'}} />
                <p className='grey2'>{fig.figDesc} .</p>
              </div>
              )
    } else if (image.url && figure.options.length>0 ){

      return (
              <div className='fig cursor' onClick={e=>this.loadGalleryContents(figure.options, 'figure')} >
                <img className={(figure.rotate)? 'rotate' : ''} src={image.url} alt={fig.figDesc} style={{width:'95%'}} />
                <p><span className='grey2'>{fig.figDesc} .</span><br/>Click to load gallery of related views.</p>
              </div>
              )
    } else if (fig.figDesc && figure.options.length>0){

      return <p className='cursor' onClick={e=>this.loadGalleryContents(figure.options, 'figure')}>No Direct Public Source Match. Click to load gallery of related views<br/>. <span className='grey2' >{fig.figDesc} .</span></p>
    }

  }

  insertHtmlNote(a) {
    return {__html: this.props.nav.text[this.props.nav.chp].notes[a]};
  }


  render() {

    var chapter = this.props.nav.text[this.props.nav.chp];
    var full = {overflowY:'scroll', height:'700px'};

    return (
              <div id='containerElement' style={(this.props.pane.fullscreen)? full : {}}>
          			<div className='row' ref={'999-section'} >
	                	<div className= 'col-3 small'>
	                	</div>
	                	<div className= 'col-9 small'>
                    {chapter && this.props.output === 'text' &&
                      <div ref="title">
  	                		<h3 className='p10'>{chapter.titles.title}</h3>
  	                		<h5 className='p10'>{chapter.titles.subtitle}</h5>
                        <p onClick={this.print} className='cursor'> print chapter </p>
                      </div>
                    }
                    {chapter && this.props.output === 'note' &&
                      <div ref="title">
                        <h3 className='p10'>Notes: {chapter.titles.title}</h3>
                        <h5 className='p10'>{chapter.titles.subtitle}</h5>
                        <p onClick={this.print} className='cursor'> print notes </p>
                      </div>
                    }
	                	</div>
	                </div>
              	{chapter && this.props.output === 'text' &&
              		chapter.paragraphs.map((items, i)=>{

              			return (
			              	<div className='row' id={i + '-section'} ref={i + '-section'} >
                        <SideLinks items={items} actions = {{ site: this.handleSite, figure: '', resource: this.handleRes, note: this.handleNote}}  iter= {i} />
                        {i!== 0 && !items.text.includes('Notes for Chapter') &&
			                	  <div className="col-9">
    			                	{/*<Waypoint
    			                		topOffset={this.state.topOffset+40}
    			                		bottomOffset={100}
    			                		>
                              {/*<div dangerouslySetInnerHTML={this.insertHtml(i)} />*/}
                              {!items.figures &&
                                this.insertHtml(i)
                              }
                              {items.figures &&
                                this.insertFig(items.figures, i)
                              }
    			                		{/*</Waypoint>*/}
			                	  </div>
                        }
                        {i=== 0 &&
                          <div className="col-9" />
                        }
			                </div>
              			        )
              		})
              	}

                {chapter && this.props.output === 'note' && chapter.notes &&
                  chapter.notes.map((items, i)=>{
                    return (
                       <div className='row' id={i + '-section'} ref={i + '-section'} >
                          <div className= 'col-3 small ' />
                          <div className="col-9">
                            <Waypoint
                              topOffset={this.state.topOffset+40}
                              bottomOffset={100}
                              >
                              <div dangerouslySetInnerHTML={this.insertHtmlNote(i)}  />
                              </Waypoint>
                          </div>
                        </div>
                            )
                  })

                }
                {chapter && this.props.output === 'note' && !chapter.notes &&
                  <div className='row' >
                          <div className= 'col-3 small ' />
                          <div className="col-9 cursor" onClick={e=>this.returnToText()} >
                          <p>Sorry, no notes in this chapter's text. Click to return to main text.</p>
                        </div>
                  </div>
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
    img: state.img,
    agent: state.agent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setChapterDrawer: (button) => {
        dispatch(setChapterDrawer(button));
    },
    setChpPara: (chp, para) => {
        dispatch(setChpPara(chp, para));
    },
    setChpParaN: (para) => {
        dispatch(setChpParaN(para));
    },
    setSiteData: (id, name)=>{
    	dispatch(setSiteData(id, name));
    },
    setAgentData: (id, name)=>{
      dispatch(setAgentData(id, name));
    },
    setUpdate: (bool) =>{
    	dispatch(setUpdate(bool));
    },
    setPanesTabs: (a,b,c)=>{
      dispatch(setPanesTabs(a,b,c));
    },
    setSelResources: (resObj, resAll)=>{
      dispatch(setSelResources(resObj, resAll));
    },
    activateGallery: (type)=>{
      dispatch(activateGallery(type));
    },
    loadGallery: (imgArr, type)=>{
      dispatch(loadGallery(imgArr, type));
    },

  }
}

const TextPane = connect(mapStateToProps, mapDispatchToProps)(Text);


export default TextPane;
