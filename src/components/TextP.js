import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// import Scroll from 'react-scroll'; // Imports all Mixins
// import {scroller, Element} from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

import Waypoint from 'react-waypoint';

import EnlargeFull from './EnlargeFull.js';

//import sampleText from '../chapters/07.xml';
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
   	inView:[],
    text:'',
    notes: [],
   }// defer definitions
 }

 	componentDidMount(){
 		this.setState({topOffset:document.getElementById('largePane').offsetParent.offsetTop})
    console.dir(this);
    //this.scrollTo(this.props.nav.para+'-section')
    axios.get('../chapters/07.xml')
    .then(response => {
      this.setState({text:response.data})
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
 	}

  shouldComponentUpdate(nextProps, nextState){
    return (this.state.notes !== nextState.notes || this.state.text !== nextState.text)
  }

  componentDidUpdate(){
    var notes = document.getElementsByTagName('note')
    var notesArr =[].slice.call(notes)
    var noteArr = notesArr.map(note=>{
      return {
      contents:note.innerText,
      xmlId:note.attributes[0].nodeValue,
      id:note.attributes[0].nodeValue.replace('CH7-n', '')
      }
    })

    // this.setState({notes:noteArr});
    // while (notes.length<0){
    //   notes.remove(notes.length-1);
    // }
    console.log(notes, noteArr)
  }

  insertHtml() {
    return {__html: this.state.text};
  }

  render() {
  	//var chapter = sampleText;
  	//var scroll = chapter.map(items=>items+'-section');

    return (
              <div id='containerElement'>
          			<div className='row' ref={'999-section'} >
	                	<div className= 'col-3 small'>
	                	</div>
	                	<div className= 'col-9 small'>
	                		<h3 className='p10'>title here</h3>
	                		<h5>...</h5>
	                	</div>
	                </div>
                  <div className='row' ref={'000-section'} >
                    <div className= 'col-3 small'>
                    </div>
                    <div className= 'col-9 small'>
                      <div ref='original' dangerouslySetInnerHTML={this.insertHtml()} />
                    </div>
                  </div>
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
