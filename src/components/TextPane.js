import React, { Component } from 'react';

//this should work such that the nav bar 'onClick', pulls in the text for a specific chapter and the scroll-to-id for subsections and/or case studies (dispatch to overall store)

//that chapter object holds and array of paragraph objects and/or subheader objects which also note footnotes, original pages, site tags, people tags, images, captions, etc.

//should have a setting that then loads the images, geo information - default first in the top paragraph or on clicking on the case study.... so automate the side loading (dispatch to overall store)... so a scroll spy and direct click launch of that information.

class TextPane extends Component {
  constructor(props) {
   super(props);
   this.state = {
   	footnote: '',
   	site: '',
   }// defer definitions
 }

  handleNote = (value) => {
  	console.log('note clicked ', value)
    this.setState({
      footnote: value,
    });
  };


  render() {
  	var chapter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

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
			              	<div className='row' id={items + 'section'}>
			                	<div className= 'col-3 small'>
			                		<ul>
			                			<li className="p10 cursor" onClick={e=>this.handleNote(e.target.attributes.id.value)} id={items}>footnotes & biblio updates</li>
			                		</ul>
			                	</div>
			                	<div className="col-9">
			                		<p className="p10s">Sed bibendum dapibus risus. Phasellus quis enim velit. Morbi sed nisl quam. Quisque quis arcu hendrerit, congue mauris sit amet, consequat felis. Donec fringilla tellus ipsum, et elementum massa facilisis et. Nullam quis mauris leo. Maecenas venenatis lacus massa, gravida consequat mauris ultrices quis. Morbi tincidunt risus diam, pharetra cursus nulla finibus suscipit. Donec finibus facilisis interdum. Ut tempus, lorem ut dapibus malesuada, sem velit ultricies turpis, nec ultricies ex sem commodo orci. Mauris finibus eros sit amet diam ornare, sed egestas libero dignissim. Nunc egestas facilisis velit, commodo vehicula justo ultricies vitae. Maecenas sit amet fringilla est. Donec et enim lectus. Integer est turpis, semper eu faucibus eget, auctor vitae elit. Aliquam erat volutpat.</p>
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
