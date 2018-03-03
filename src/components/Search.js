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

import agents from '../data/07agentsA_ulan.js';
import sites from '../data/07sitesA_tng.js';
//import indexTerms from '../data/xxxx';
//import themeTerms from '../data/xxxx';

var sections = [{text:'full-text', icon:'fa fa-search'},
    {text:'themes',icon:'fa fa-search-plus'},
    {text:'tags' , icon:'fa fa-search-minus'}]
var sections2 = [
    {text:'sites' , icon:'fa fa-bookmark-o'},
    {text:'agents' , icon:'fa fa-bookmark-o'},
    {text:'resources' , icon:'fa fa-bookmark-o'}];

var ag = agents.map(a=>{return {text:a.name[0]}});
var si = sites.filter(a=>a.type==='site').map(a=>{return {text:a.name[0]}});

var fakeItems = {
  agents: ag,
  sites: si,
  'resources':[
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
],
};


const themeTerms = {
  'full-text':['xml', 'search', 'for', 'typed', 'names', 'and', 'general', 'ideas'],
  'themes': ['site', 'science', 'social', 'sense', 'and', 'their', 'sub-categories', 'for', 'finer', 'trajectories'],
  'tags': ['to', 'be', 'drawn', 'from', 'the', 'hierarchical', 'control', 'vocabularies']
};

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
    sites: false,
    agents: false,
    resources: false,
   }// defer?
 }

   handleTouchTap = (event, type) => {
    event.preventDefault();

    var obj={};
    obj[type] = true;

    this.setState({anchorEl: event.currentTarget});
    this.setState(obj);
  };

  handleRequestClose = (e,type) => {
    var obj={};
    obj[type] = false;

    this.setState(obj);
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
              dataSource={themeTerms[item.text]}
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
      {sections2.map(items=>{
        return (
            <div className='col font-m'>
        <FlatButton
          onClick={e=>this.handleTouchTap(e,items.text)}
          label={items.text}
          fullWidth={true}
          labelStyle={{textTransform: 'lowercase', position:'relative', top:-4}}
          style={{height:32}}
        />
        <Popover
          open={this.state[items.text]}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={e=>this.handleRequestClose(e,items.text)}
        >
          <Menu
          maxHeight={300}
          >
          {fakeItems[items.text] &&
          fakeItems[items.text].map(entry=> <MenuItem primaryText={entry.text} />)
          }
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
