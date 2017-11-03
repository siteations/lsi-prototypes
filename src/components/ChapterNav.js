import React, { Component } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

//drop-down toggles to hold nested info
//when clicked should open drawer to allow futher subselection

class ChapterNav extends Component {
  constructor(props) {
   super(props);
   this.state = {open: false};
 }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
  	var array = ['a', 'b', 'c', 'd'];
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
			      	<button className={`btn btn-light btn-block ${bClass}`} onClick={this.handleToggle}>
			      	{this.props.type} {item}
			      	</button>

						  <Drawer
			          docked={false}
			          width={300}
			          open={this.state.open}
			          onRequestChange={(open) => this.setState({open})}
			          overlayStyle={{opacity:'.15'}}
			        >
			          <MenuItem onClick={this.handleClose}>Chapter Title</MenuItem>
			          <Divider inset={true} />
			          <MenuItem onClick={this.handleClose} insetChildren={true} >Chapter Subsection</MenuItem>
			          <MenuItem
				          primaryText="Chapter Subsection"
				          rightIcon={<ArrowDropRight />}
				          insetChildren={true}
				          menuItems={[
				          			<MenuItem primaryText="Section Start"  onClick={this.handleClose}/>,
				          			<Divider />,
				          			<MenuItem primaryText="Site 1"  onClick={this.handleClose}/>,
				                <MenuItem primaryText="Site 2"  onClick={this.handleClose}/>,
				                <MenuItem primaryText="Site 3"  onClick={this.handleClose}/>,
				                <MenuItem primaryText="Site 4"  onClick={this.handleClose}/>,
				              ]} />
			          <MenuItem onClick={this.handleClose} insetChildren={true} >Chapter Subsection</MenuItem>
			        </Drawer>

			      </div>
	      	        )
	      })}

      </div>
    );
  }
}

export default ChapterNav;
