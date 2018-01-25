import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Scroll from 'react-scroll'; // Imports all Mixins
// import {scroller, Element} from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

import Waypoint from 'react-waypoint';

import EnlargeFull from './EnlargeFull.js';

import {drawer, setChapterDrawer, setChpPara, setSiteData, setUpdate, setChpParaL} from '../action-creators/navActions.js';
import {setPanesTabs} from '../action-creators/paneActions.js';

//this should work such that the nav bar 'onClick', pulls in the text for a specific chapter and the scroll-to-id for subsections and/or case studies (dispatch to overall store)

//that chapter object holds and array of paragraph objects and/or subheader objects which also note footnotes, original pages, site tags, people tags, images, captions, etc.

//should have a setting that then loads the images, geo information - default first in the top paragraph or on clicking on the case study.... so automate the side loading (dispatch to overall store)... so a scroll spy and direct click launch of that information.

class TextP extends Component {
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
    console.dir(this.props.nav);
    //this.scrollTo(this.props.nav.para+'-section')
 	}

 	shouldComponentUpdate(nextProps, nextState){
    var test = ((this.props.nav.text !== nextProps.nav.text || (this.props.nav.siteName !== nextProps.nav.siteName && this.props.nav.para !== nextProps.nav.para) || this.props.nav.chp !== nextProps.nav.chp) && this.props.nav.setUp )
    console.log('update?', test, this.props.nav.setUp )
 		return test
 	}

  componentDidUpdate(){
    if (this.props.nav.para!==0 && this.props.pane.mainTab ==='a'){
      this.props.setUpdate(false);
   	  this.scrollTo(this.props.nav.para+'-section')
    } else {
      this.props.setUpdate(false);
      this.scrollTo('999-section')
    }
  }

  //update to handle the actual paragraph alignment
  handleNote(value){
    var noteP = value-1;
    //console.log(this.state.inView[0], noteP)
    this.props.setChpParaL(this.state.inView[0]);
    this.props.setChpPara(this.props.nav.chp, noteP);
    //switch to resources
    this.props.setPanesTabs('main','text','b');
    this.scrollTo('999-section');
  }

  returnToText(){
    // this.props.setChpPara(this.props.nav.chp, this.props.nav.paraL);
    // //switch to resources
    this.props.setPanesTabs('main','text','a');
    this.scrollTo('999-section');
  }

  handleSite = (value, id, name) => {
  	this.props.setChpPara(this.props.nav.chp, value);
  	this.props.setSiteData(id, name);
  	this.props.setUpdate(false);
  }

  formatString = (string)=>{
  	var text='';

  	var strg2 = string.replace('<note n="*" place="bottom">', '*').replace('</note>', '').replace('</div>', '').replace('</p>', '').replace('<g ref="char:punc">', '').replace('</g>', '').replace(/<pb n="\d*" facs="\S*" rendition="simple:additions" \/>/g, '').replace('</argument>', '').replace(/<gap.*<\/gap>/g, '')

    const formatL = (str)=>{
    	return str.replace(/<q>|<lg>|<\/q>|<\/lg>/g, '').replace(/<site n="\d*" name="(\w|'|\s)*">/g, '').replace(/<\/site>/g, '^ ')
			                				.split('<l>')
			 												.map(lines=>{
			 													if (lines.includes('</l>')){
			 														return <span>{lines.replace('</l>', '')}<br/></span>
			 													} else {
			 														return <span>{lines}</span>
			 													}
			 												})
    }


  	// if (string.includes('<hi>')){
  	text = strg2.split(/<hi>|<bibl>/g)
            				.map(sections=>{
              				if (sections.includes('</hi>')){
              					var parts = sections.split('</hi>');
              					return <span><em> {parts[0]} </em> {formatL(parts[1])}</span>
              				} else if (sections.includes('</bibl>')){
              					var parts = sections.split('</bibl>');
              					return <span style={{paddingLeft: 90, lineHeight:3}}><em> {parts[0]} </em> {formatL(parts[1])}</span>
              				}else {
              					return formatL(sections);
              				}
            				})



    return text
  }

  scrollEnter = (e) => {
  	// var para=e.id.replace('-section', '');

  	let view=this.state.inView;
  	view.push(parseInt(e.id.replace('-section', '')));

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

  scrollLeave = (e) => {
  	let view=this.state.inView;
  	view.splice(view.indexOf(parseInt(e.id.replace('-section', ''))), 1);
  	this.setState({inView:view});
  }

  scrollTo = (value) => {

   this.refs[value].scrollIntoView({block: 'start', behavior: 'instant'});
  }

  insertHtml(a) {
    return {__html: this.props.nav.text[this.props.nav.chp].paragraphs[a].text};
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
			                		<ul>
			                			{items.notes &&
                              items.notes.map(note=>{
                                return (
			                				<li className="cursor" onClick={e=>this.handleNote(note.value)}><em>note:</em> {note.value}</li>
                              )
                              })
			                			}
			                			{items.sites &&
                              items.sites.map(site=>{
                                return (
                                  <li className="cursor" onClick={e=>this.handleSite(e.target.attributes.id.value, site.id, site.value)} id={i}><em>site:</em> {site.value}</li>
                                        )
                              })
			                			}
			                		</ul>
			                	</div>
                        {i!== 0 &&
			                	<div className="col-9">
			                	<Waypoint
			                		topOffset={this.state.topOffset+40}
			                		bottomOffset={100}
			                		onEnter={e=>{e.id = i+'-section';
			                			this.scrollEnter(e)}}
			                		onLeave={e=>{e.id = i+'-section';
			                			this.scrollLeave(e)}}
			                		>
                          <div dangerouslySetInnerHTML={this.insertHtml(i)} />
			                		{/*<p className="p10s"><em className="small grey">(pg: {items.page})</em></p>*/}
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
                        <div className="col-9" onClick={e=>this.returnToText()} className="cursor" >
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
                          onEnter={e=>{e.id = i+'-section';
                            this.scrollEnter(e)}}
                          onLeave={e=>{e.id = i+'-section';
                            this.scrollLeave(e)}}
                          >
                          <div dangerouslySetInnerHTML={this.insertHtmlNote(i)} onClick={e=>this.returnToText()} className="cursor" />

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
    setChpParaL: (para) => {
        dispatch(setChpParaL(para));
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

const TextPane = connect(mapStateToProps, mapDispatchToProps)(TextP);


export default TextPane;
