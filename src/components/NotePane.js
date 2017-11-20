import React, { Component } from 'react';

class NotePane extends Component {
  constructor(props) {
   super(props);
   this.state = {}// defer definitions
 }



  render() {
  	var chapter = ['a'];

    return (
              <div >
          			<div className='row'>
	                	<div className= 'col-3 small'>
	                	</div>
	                	<div className= 'col-9 small'>
	                		<h3 className='p10'>chapter notes</h3>
	                		<h5>inherit/scroll to note if triggered by click on footnote</h5>
	                	</div>
	                </div>
              	{chapter &&
              		chapter.map(items=>{
              			return (
			              	<div className='row' id={items + 'section'}>
			                	<div className= 'col-3 small'>
			                		<ul>
			                			<li className="p10">basic endnote or extended annotations</li>
			                		</ul>
			                	</div>
			                	<div className="col-9">
			                		<p className="p10s">Full endnote with commentary. Sed bibendum dapibus risus. Phasellus quis enim velit. Morbi sed nisl quam. Quisque quis arcu hendrerit, congue mauris sit amet, consequat felis. Donec fringilla tellus ipsum, et elementum massa facilisis et. Nullam quis mauris leo. Maecenas venenatis lacus massa, gravida consequat mauris ultrices quis. Morbi tincidunt risus diam, pharetra cursus nulla finibus suscipit. Donec finibus facilisis interdum. Ut tempus, lorem ut dapibus malesuada, sem velit ultricies turpis, nec ultricies ex sem commodo orci. Mauris finibus eros sit amet diam ornare, sed egestas libero dignissim. Nunc egestas facilisis velit, commodo vehicula justo ultricies vitae. Maecenas sit amet fringilla est. Donec et enim lectus. Integer est turpis, semper eu faucibus eget, auctor vitae elit. Aliquam erat volutpat.</p>
			                	</div>
			                </div>
              			        )
              		})

              	}
              </div>
    );
  }
}

export default NotePane;
