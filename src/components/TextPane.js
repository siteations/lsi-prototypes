import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

//this should work such that the nav bar 'onClick', pulls in the text for a specific chapter and the scroll-to-id for subsections and/or case studies (dispatch to overall store)

//that chapter object holds and array of paragraph objects and/or subheader objects which also note footnotes, original pages, site tags, people tags, images, captions, etc.

//should have a setting that then loads the images, geo information - default first in the top paragraph or on clicking on the case study.... so automate the side loading (dispatch to overall store)... so a scroll spy and direct click launch of that information.

class TextPane extends Component {
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
  	var chapter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  	var scroll = chapter.map(items=>items+'-section');

    return (
              <div>
          			<div className='row'>
	                	<div className= 'col-3 small'>
	                	</div>
	                	<div className= 'col-9 small'>
	                		<h3 className='p10'>title here</h3>
	                		<h5>subtitle here</h5>
	                	</div>
	                </div>
              	{chapter &&
              		chapter.map(items=>{
              			return (
			              	<div className='row' id={items + '-section'}>
			                	<div className= 'col-3 small'>
			                		<ul>
			                			<li className="p10 cursor" onClick={e=>this.handleNote(e.target.attributes.id.value)} id={items}>footnotes & biblio updates</li>
			                		</ul>
			                	</div>
			                	<div className="col-9">
			                	<Waypoint
			                		topOffset={this.state.topOffset+100}
			                		bottomOffset={100}
			                		onEnter={e=>{e.id = items+'-section';
			                			e.sites = items+'-cases';
			                			e.agents = items+'-agents';
			                			e.media = items+'-media';
			                			this.scrollEnter(e)}}
			                		onLeave={e=>{e.id = items+'-section';
			                			e.sites = items+'-cases';
			                			e.agents = items+'-agents';
			                			e.media = items+'-media';
			                			this.scrollLeave(e)}}
			                		>
			                		<p className="p10s">{items+'-section'} Sed bibendum dapibus risus. Phasellus quis enim velit. Morbi sed nisl quam. Quisque quis arcu hendrerit, congue mauris sit amet, consequat felis. Donec fringilla tellus ipsum, et elementum massa facilisis et. Nullam quis mauris leo. Maecenas venenatis lacus massa, gravida consequat mauris ultrices quis. Morbi tincidunt risus diam, pharetra cursus nulla finibus suscipit. Donec finibus facilisis interdum. Ut tempus, lorem ut dapibus malesuada, sem velit ultricies turpis, nec ultricies ex sem commodo orci. Mauris finibus eros sit amet diam ornare, sed egestas libero dignissim. Nunc egestas facilisis velit, commodo vehicula justo ultricies vitae. Maecenas sit amet fringilla est. Donec et enim lectus. Integer est turpis, semper eu faucibus eget, auctor vitae elit. Aliquam erat volutpat.</p>
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

export default TextPane;
