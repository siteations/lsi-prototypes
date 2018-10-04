import React, { Component } from 'react';
import { connect } from 'react-redux';

import EnlargeSide from './EnlargeSide.js';

import {setSideTop} from '../action-creators/paneActions.js';


class Text extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }

  insertHtml(a) {
    return {__html: this.props.nav.text[this.props.nav.chp].paragraphs[a].text};
  }

  insertHtmlNote(a) {
    return {__html: this.props.nav.text[this.props.nav.chp].notes[a]};
  }

    render(){
    var chapter = this.props.nav.text[this.props.nav.chp];

    return (
    <div style={{height:this.props.hi}}>
    <EnlargeSide loc={this.props.placement} />
    <div style={{height:this.props.hi}} className='scroll p15'>
              <div id='containerElement'>
                <div className='row' ref={'999-section'} >
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
                {chapter && this.props.output === 'text' &&
                  chapter.paragraphs.map((items, i)=>{
                    return (
                      <div className='row' id={i + '-section'} ref={i + '-section'} >
                        {i!== 0 &&
                        <div className="col-12">

                          <div dangerouslySetInnerHTML={this.insertHtml(i)} />

                        </div>
                        }
                        {i=== 0 &&
                          <div className="col-12" />

                        }
                      </div>
                            )
                  })

                }
                {chapter && this.props.output === 'note' && !chapter.notes &&
                <div className='row' >

                        <div className="col-12 cursor" onClick={e=>this.returnToText()} >
                        <p>Sorry, no notes in this chapter's text. Click to return to main text.</p>
                        </div>
                </div>
                }
                {chapter && this.props.output === 'note' && chapter.notes &&
                  chapter.notes.map((items, i)=>{
                    return (
                      <div className='row' id={i + '-section'} ref={i + '-section'} >
                        <div className="col-12">

                          <div dangerouslySetInnerHTML={this.insertHtmlNote(i)} onClick={e=>this.returnToText()} className="cursor" />

                        </div>
                      </div>
                            )
                  })

                }

                </div>
        </div>
    </div>
    )
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
    setSideTop: (type, tab) => {
        dispatch(setSideTop(type, tab));
    },
  }
}

const TextPaneS = connect(mapStateToProps, mapDispatchToProps)(Text);

export default TextPaneS;
