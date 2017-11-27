import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';

import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
//import indexTerms from '../data/xxxx';
//import themeTerms from '../data/xxxx';

var sections = [{text:'full-text', icon:'fa fa-search'},
    {text:'theme',icon:'fa fa-search-plus'},
    {text:'index' , icon:'fa fa-search-minus'},
    {text:'tags' , icon:'fa fa-search-minus'}]
var sections2 = [
    {text:'sites' , icon:'fa fa-bookmark-o'},
    {text:'agents' , icon:'fa fa-bookmark-o'},
    {text:'bibliography' , icon:'fa fa-bookmark-o'}];

var fakeItems = [
    {text:'this' , icon:'fa fa-bookmark-o'},
    {text:'is' , icon:'fa fa-bookmark-o'},
    {text:'placeholder' , icon:'fa fa-bookmark-o'},
    {text:'text' , icon:'fa fa-bookmark-o'},
    {text:'is' , icon:'fa fa-bookmark-o'},
    {text:'placeholder' , icon:'fa fa-bookmark-o'},
    {text:'this' , icon:'fa fa-bookmark-o'},
    {text:'is' , icon:'fa fa-bookmark-o'},
    {text:'placeholder' , icon:'fa fa-bookmark-o'},
    {text:'text' , icon:'fa fa-bookmark-o'},
    {text:'is' , icon:'fa fa-bookmark-o'},
    {text:'placeholder' , icon:'fa fa-bookmark-o'},

]


const themeTerms = ['text', 'test', 'theme'];

const style={
  fontSize: 10,
  marginRight: 5,
  marginTop:10,
  height: 10,
  tf: {
    height: 12,
    marginTop: 2,
    paddingTop:0
  }
}


class Search extends Component {
  constructor(props) {
   super(props);
   this.state = {
    value: 1,
    open: false,
   }// defer?
 }

   handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {

              //     textFieldStyle={style.tf}
              // labelStyle={{top:-10}}
              // inputStyle ={{marginTop:4}}
    return (
      <div className="navBar navSearch row">
      <div className="col-3">
        <h4 className="p10s m">Landscape Design</h4>
      </div>
      <div>
          <FontIcon className='fa fa-search' style={style}/>
          search:
      </div>
      {sections.map(item=>{
        return (
      <div className='col font-m'>
            <AutoComplete
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={5}
              dataSource={themeTerms}
              hintText={item.text}
              style={{height:32, marginTop:0}}
              hintStyle={{top:0, color: '#000000', fontSize:12, transform:'', transition:''}}
              textFieldStyle={{height:32, marginTop:0, position:'absolute'}}
              fullWidth={true}
              onNewRequest={e=>console.log(e)}
            />
      </div>
        )
      })}
      <div>
          <FontIcon className='fa fa-bookmark-o' style={style}/>
          browse:
      </div>
      {sections2.map(item=>{
        return (
            <div className='col font-m'>
        <FlatButton
          onClick={this.handleTouchTap}
          label={item.text}
          fullWidth={true}
          labelStyle={{textTransform: 'lowercase', position:'relative', top:-4}}
          style={{height:32}}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu
          maxHeight={300}
          >
          {fakeItems.map(item=> <MenuItem primaryText={item.text} />)}
          </Menu>
        </Popover>
      </div>
        )
      })}
      </div>
    );
  }
}

export default Search;
