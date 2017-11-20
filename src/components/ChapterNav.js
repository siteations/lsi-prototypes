import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

//drop-down toggles to hold nested info
//when clicked should open drawer to allow futher subselection

class ChapterNav extends Component {
  constructor(props) {
   super(props);
   this.state = {open: false, value: 1, type: 'chapter', theme: 'site'};
 }

  handleToggle = () => this.setState({open: !this.state.open});
  handleToggleTheme = (e) => {this.setState({open: !this.state.open}); console.dir(e.target.offsetParent.id); this.setState({theme:e.target.offsetParent.id})};

  handleClose = () => this.setState({open: false});

  handleChapTheme = (event, index, value) => {
  	this.setState({value})
  	if (value === 1){this.setState({type: 'chapter'})} else { this.setState({type: 'theme'}) };
	};

  render() {
  	var array = ['a', 'b', 'c', 'd', 'e', 'f'];
  	var arraytheme = ['site', 'science', 'social', 'sensory'];
  	var tClass = (this.state.type === 'theme')?'font-sm': ''

    return (
      <div className="row navBar">
	      <div className='col eveleth' style={{height: '40px'}}>
	      	<div className={`p10 ${tClass}`}>
        <SelectField
          floatingLabelText="Navigate by:"
          value={this.state.value}
          onChange={this.handleChapTheme}
          style={{height:32}}
          floatingLabelStyle={{top:'10px'}}
          iconStyle={{height:12, top:-24}}
          labelStyle={{top:-12, height:'', lineHeight:'', fontFamily: 'Eveleth'}}
        >
          <MenuItem value={1} primaryText="Chapters" />
          <MenuItem value={2} primaryText="Themes" />
        </SelectField>
	      	</div>
	      </div>
	      {this.state.type === 'chapter' &&
	      array.map(item=>{
	      	return (
			      <div className='col'>
			      	<FlatButton
			      	onClick={this.handleToggle}
			      	label={`${this.state.type} ${item}`}
			      	fullWidth={true}
			      	/>

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
	      {this.state.type === 'theme' &&
	      		      arraytheme.map(item=>{
	      	return (
			      <div className='col'>
			      	<FlatButton
			      	onClickCapture={e =>this.handleToggleTheme(e)}
			      	label={`explorations of ${item}`}
			      	fullWidth={true}
			      	id={item}
			      	/>
			      <Drawer
			          docked={false}
			          width={300}
			          open={this.state.open}
			          onRequestChange={(open) => this.setState({open})}
			          overlayStyle={{opacity:'.15'}}
			        >
			          <MenuItem onClick={this.handleClose}>{this.state.theme}</MenuItem>
			          <Divider inset={true} />
			          <MenuItem onClick={this.handleClose} insetChildren={true} >{`${this.state.theme} subtheme (tbd)`}</MenuItem>
			          <MenuItem
				          primaryText={`${this.state.theme} subtheme (tbd)`}
				          rightIcon={<ArrowDropRight />}
				          insetChildren={true}
				          menuItems={[
				          			<MenuItem primaryText={`show all ${this.state.theme} subtheme works`}  onClick={this.handleClose}/>,
				          			<Divider />,
				          			<MenuItem primaryText={`${this.state.theme} sub2a`}  onClick={this.handleClose}/>,
				                <MenuItem primaryText={`${this.state.theme} sub2b`}  onClick={this.handleClose}/>,
				                <MenuItem primaryText={`${this.state.theme} sub2c`}  onClick={this.handleClose}/>,
				                <MenuItem primaryText={`${this.state.theme} sub2d`}  onClick={this.handleClose}/>,
				              ]} />
			          <MenuItem onClick={this.handleClose} insetChildren={true} >{`${this.state.theme} subtheme (tbd)`}</MenuItem>
			        </Drawer>

			      </div>
	    )}
	      	)}

      </div>
    );
  }
}

export default ChapterNav;
