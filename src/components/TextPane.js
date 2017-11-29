import React, { Component } from 'react';
import { connect } from 'react-redux';

import Waypoint from 'react-waypoint';

import sampleText from '../data/Gilpin.js';
import {drawer, setChapterDrawer, setChpPara, setSiteData} from '../action-creators/navActions.js';

//this should work such that the nav bar 'onClick', pulls in the text for a specific chapter and the scroll-to-id for subsections and/or case studies (dispatch to overall store)

//that chapter object holds and array of paragraph objects and/or subheader objects which also note footnotes, original pages, site tags, people tags, images, captions, etc.

//should have a setting that then loads the images, geo information - default first in the top paragraph or on clicking on the case study.... so automate the side loading (dispatch to overall store)... so a scroll spy and direct click launch of that information.

class TextP extends Component {
  constructor(props) {
   super(props);
   this.state = {
   	footnote: '',
   	site: '',
   	topOffset: 0,
   	inView:[]
   }// defer definitions
 }

 	componentDidMount(){
 		this.setState({topOffset:document.getElementById('largePane').offsetParent.offsetTop})
 	}

  handleNote = (value) => {
  	console.log('note clicked ', value)
    this.setState({
      footnote: value,
    });
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

  	let view=this.state.inView;
  	view.push(e.id)
    this.setState({inView:view});
    console.log(this.state.inView)

  }

  scrollLeave = (e) => {
  	console.log(e)
  	let view=this.state.inView;
  	view.splice(view.indexOf(e.id), 1);
  	this.setState({inView:view});
  	console.log(this.state.inView)

  }


  render() {
  	var chapter = sampleText[this.props.nav.chp];
  	//var scroll = chapter.map(items=>items+'-section');

    return (
              <div>
          			<div className='row'>
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
			              	<div className='row' id={i + '-section'}>
			                	<div className= 'col-3 small'>
			                		<ul>
			                			{items.notes &&
			                				<li className="p10 cursor" onClick={e=>this.handleNote(e.target.attributes.id.value)} id={i}>{(items.notes.length>101)?items.notes.slice(0,100)+'. . .': items.notes}</li>
			                			}
			                			{items.site &&
			                				<li className="p10 cursor" onClick={e=>this.handleNote(e.target.attributes.id.value)} id={i}>^ site: {items.site[0].name}</li>
			                			}
			                		</ul>
			                	</div>
			                	<div className="col-9">
			                	<Waypoint
			                		topOffset={this.state.topOffset+100}
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
    }

  }
}

const TextPane = connect(mapStateToProps, mapDispatchToProps)(TextP);


export default TextPane;
