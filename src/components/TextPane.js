import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Scroll from 'react-scroll'; // Imports all Mixins
// import {scroller, Element} from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

import Waypoint from 'react-waypoint';

import {setChapterDrawer, setChpPara, setSiteData, setUpdate, setChpParaN} from '../action-creators/navActions.js';
import {setPanesTabs} from '../action-creators/paneActions.js';

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
 }

 	componentDidMount(){
 		this.setState({topOffset:document.getElementById('largePane').offsetParent.offsetTop})
 	}

 	shouldComponentUpdate(nextProps, nextState){
    var test = (this.props.nav.text !== nextProps.nav.text || this.props.pane.mainTab !== nextProps.pane.mainTab || (this.props.nav.siteName !== nextProps.nav.siteName && this.props.nav.para !== nextProps.nav.para && this.props.nav.paraN !== nextProps.nav.paraN) || this.props.nav.chp !== nextProps.nav.chp)
    console.log('update?', test, this.props.nav.setUp )
 		return test || this.props.nav.setUp
 	}

  componentDidUpdate(){
    if (this.props.nav.para!==0 && this.props.pane.mainTab ==='a'){
      this.props.setUpdate(false);
   	  this.scrollTo(this.props.nav.para+'-section')
      console.log('scroll to ', this.props.nav.para)
    } else if (this.props.nav.paraN!==0 && this.props.pane.mainTab ==='b'){
      this.props.setUpdate(false);
      this.scrollTo(this.props.nav.paraN+'-section')
    } else { //so what are these conditions
      this.props.setUpdate(false);
      this.scrollTo('999-section')
    }
  }

  //update to handle the actual paragraph alignment
  handleNote(value, e){
    var noteP = value-1;
    var regP = +e.target.attributes.value.value;

    this.props.setChpParaN(noteP);
    this.props.setPanesTabs('main','text','b');
    this.props.setChpPara(this.props.nav.chp, regP);
    this.props.setUpdate(true);
  }

  //update to handle the actual paragraph alignment
  handleRes(value, e){
    console.log(value, e);
    var noteP = value;
    var regP = +e.target.attributes.value.value;

    this.props.setChpParaN(noteP);
    this.props.setPanesTabs('main','text','c');
    this.props.setChpPara(this.props.nav.chp, regP);
    this.props.setUpdate(true);

  }

  returnToText(){
    this.props.setPanesTabs('main','text','a');
    this.props.setUpdate(true);
    console.log('return to text')
  }

  handleSite(value, id, name){
  	this.props.setChpPara(this.props.nav.chp, value);
  	this.props.setSiteData(id, name);
  	this.props.setUpdate(false);
  }

  minusFigures(string){
    var figures = string.match(/(<figure.+?<\/figure>)/gmi);
    //console.log(figures);
    var str2 = string.replace(/(<figure.+?<\/figure>)/gmi, '');

    return str2
  }

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

  scrollTo(value){
   this.refs[value].scrollIntoView({block: 'start', behavior: 'instant'});
  }

  insertHtml(a){
    return {__html: this.minusFigures(this.props.nav.text[this.props.nav.chp].paragraphs[a].text)};
  }

  insertHtmlNote(a) {
    return {__html: this.props.nav.text[this.props.nav.chp].notes[a]};
  }


  render() {

    var chapter = this.props.nav.text[this.props.nav.chp];

    return (
              <div id='containerElement'>
          			<div className='row' ref={'999-section'} >
	                	<div className= 'col-3 small'>
	                	</div>
	                	<div className= 'col-9 small'>
                    {chapter && this.props.output === 'text' &&
                      <div ref="title">
  	                		<h3 className='p10'>{chapter.titles.title}</h3>
  	                		<h5 className='p10'>{chapter.titles.subtitle}</h5>
                      </div>
                    }
                    {chapter && this.props.output === 'note' &&
                      <div ref="title">
                        <h3 className='p10'>Notes: {chapter.titles.title}</h3>
                        <h5 className='p10'>{chapter.titles.subtitle}</h5>
                      </div>
                    }
	                	</div>
	                </div>
              	{chapter && this.props.output === 'text' &&
              		chapter.paragraphs.map((items, i)=>{

              			return (
			              	<div className='row' id={i + '-section'} ref={i + '-section'} >
			                	<div className= 'col-3 small'>
                         <em className="small grey nb">(pg: {items.page})</em>
			                		<ul>
			                			{items.figures &&
                                  <li className="cursor" onClick="" id={items.figures.id} value={i}><em>{items.figures.figNum? 'fig:' : ''}</em> {items.figures.figD ? items.figures.figD + '...' : ''}</li>

                            }
			                			{items.sites &&
                              items.sites.map(site=>{
                                return (
                                  <li className="cursor" onClick={e=>this.handleSite(e.target.attributes.id.value, site.id, site.value)} id={i}><em>site:</em> {site.value}</li>
                                        )
                              })
			                			}
                            {items.resources && !items.figures &&
                              items.resources.map(res=>{
                                return (
                                  <li className="cursor" onClick={e=>this.handleRes(res.id, e)} value={i}><em>resource:</em> {res.value}</li>
                                        )
                              })
                            }
                            {items.notes &&
                              items.notes.map(note=>{
                                return (
                              <li className="cursor" onClick={e=>this.handleNote(note.value, e)} value={i} ><em>note:</em> {note.value}</li>
                              )
                              })
                            }
			                		</ul>
			                	</div>
                        {i!== 0 && !items.text.includes('Notes for Chapter') &&
			                	<div className="col-9">
			                	<Waypoint
			                		topOffset={this.state.topOffset+40}
			                		bottomOffset={100}
			                		>
                          <div dangerouslySetInnerHTML={this.insertHtml(i)} />

			                		</Waypoint>
			                	</div>
                        }
                        {i=== 0 &&
                          <div className="col-9" />

                        }
			                </div>
              			        )
              		})

              	}
                {chapter && this.props.output === 'note' && !chapter.notes &&
                <div className='row' >
                        <div className= 'col-3 small' />
                        <div className="col-9 cursor" onClick={e=>this.returnToText()} >
                        <p>Sorry, no notes in this chapter's text. Click to return to main text.</p>
                        </div>
                </div>
                }
                {chapter && this.props.output === 'note' && chapter.notes &&
                  chapter.notes.map((items, i)=>{
                    return (
                      <div className='row' id={i + '-section'} ref={i + '-section'} >
                        <div className= 'col-3 small' />
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

              </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
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
    setUpdate: (bool) =>{
    	dispatch(setUpdate(bool));
    },
    setPanesTabs: (a,b,c)=>{
      dispatch(setPanesTabs(a,b,c));
    }

  }
}

const TextPane = connect(mapStateToProps, mapDispatchToProps)(Text);


export default TextPane;
