import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Scroll from 'react-scroll'; // Imports all Mixins
// import {scroller, Element} from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

import Waypoint from 'react-waypoint';

import EnlargeFull from './EnlargeFull.js';

import sampleText from '../data/Gilpin.js';
import {drawer, setChapterDrawer, setChpPara, setSiteData, setUpdate} from '../action-creators/navActions.js';

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
    console.dir(this);
    //this.scrollTo(this.props.nav.para+'-section')
 	}

 	shouldComponentUpdate(nextProps, nextState){
 		return ((this.props.nav.siteName !== nextProps.nav.siteName || this.props.nav.chp !== nextProps.nav.chp) && !this.props.nav.setUp )
 	}

  componentDidUpdate(){
   	this.scrollTo(this.props.nav.para+'-section')
  }


  handleNote(value){
    this.setState({
      footnote: value,
    });
  }

  handleSite= (value, id, name)=> {
  	this.props.setChpPara(this.props.nav.chp, value);
  	this.props.setSiteData(id, name);
  	this.props.setUpdate(true);
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

  	var topSitePara = view.filter(para=>sampleText[this.props.nav.chp].paragraphs[para].site !== null);
  	var para = (view[0]<view[1] || view.length===1)? sampleText[this.props.nav.chp].paragraphs[topSitePara[0]] : sampleText[this.props.nav.chp].paragraphs[topSitePara[topSitePara.length-1]];

  	var site = (para !== undefined)? para.site[0] : null;

  	if (site){
  		this.props.setUpdate(false);
  		this.props.setSiteData(site.id, site.name);
  	}

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


  render() {
  	var chapter = sampleText[this.props.nav.chp];
  	//var scroll = chapter.map(items=>items+'-section');

    return (
              <div id='containerElement'>
          			<div className='row' ref={'999-section'} >
	                	<div className= 'col-3 small'>
	                	</div>
	                	<div className= 'col-9 small'>
	                		<h3 className='p10'>{chapter.title}</h3>
	                		<h5>...</h5>
	                	</div>
	                </div>
              	{chapter &&
              		chapter.paragraphs.map((items, i)=>{
              			return (
			              	<div className='row' id={i + '-section'} ref={i + '-section'} >
			                	<div className= 'col-3 small'>
			                		<ul>
			                			{items.notes &&
			                				<li className="p10 cursor" onClick={e=>this.handleNote(e.target.attributes.id.value)} id={i}>{(items.notes.length>101)?items.notes.slice(0,100)+'. . .': items.notes}</li>
			                			}
			                			{items.site &&
			                				<li className="p10 cursor" onClick={e=>this.handleSite(e.target.attributes.id.value, items.site[0].id, items.site[0].name)} id={i}>^ site: {items.site[0].name}</li>
			                			}
			                		</ul>
			                	</div>
			                	<div className="col-9">
			                	<Waypoint
			                		topOffset={this.state.topOffset+40}
			                		bottomOffset={100}
			                		onEnter={e=>{e.id = i+'-section';
			                			this.scrollEnter(e)}}
			                		onLeave={e=>{e.id = i+'-section';
			                			this.scrollLeave(e)}}
			                		>
			                		<p className="p10s">{this.formatString(items.text)} <br/><em className="small grey">(pg: {items.page})</em></p>
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
    setSiteData: (id, name)=>{
    	dispatch(setSiteData(id, name));
    },
    setUpdate: (bool) =>{
    	dispatch(setUpdate(bool));
    }

  }
}

const TextPane = connect(mapStateToProps, mapDispatchToProps)(TextP);


export default TextPane;
