import React, { Component } from 'react';

class ChapterNav extends Component {
  constructor(props) {
   super(props);
   this.state = {}// defer?
 }

  render() {
  	var array = ['a', 'b', 'c', 'd', 'e', 'f'];
  	var bClass = (this.props.type === 'theme')?'btn-sm': ''
  	var tClass = (this.props.type === 'theme')?'font-sm': ''

    return (
      <div className="row navBar">
	      <div className='col eveleth'>
	      	<div className={`p10 ${tClass}`}>
	      		nav {this.props.type}:
	      	</div>
	      </div>
	      {array.map(item=>{
	      	return (
			      <div className='col'>
			      	<button className={`btn btn-light btn-block ${bClass}`}>
			      	{this.props.type} {item}
			      	</button>
			      </div>
	      	        )
	      })}

      </div>
    );
  }
}

export default ChapterNav;
