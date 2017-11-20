import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
//import indexTerms from '../data/xxxx';
//import themeTerms from '../data/xxxx';

var sections = [{search:false, text:'search full-text', icon:'fa fa-search'},
    {search:false, text:'search by theme',icon:'fa fa-search-plus'},
    {search:false, text:'search index' , icon:'fa fa-search-minus'},
    {search:false, text:'browse sites' , icon:'fa fa-bookmark-o'},
    {search:false, text:'browse agents' , icon:'fa fa-bookmark-o'},
    {search:false, text:'browse bibliography' , icon:'fa fa-bookmark-o'}]


const themeTerms = ['text', 'test', 'theme'];

const style={
  fontSize: 10,
  marginRight: 5,
  marginTop:3,
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
   this.state = {}// defer?
 }

  render() {
    return (
      <div className="navBar navSearch row">
      <div className="col-4">
        <h4 className="p10s m">Landscape Design</h4>
      </div>
      {sections.map(item=>{
        return (
          <div className='col font-m'>
          {item.search &&
            <AutoComplete
              filter={AutoComplete.fuzzyFilter}
              maxSearchResults={5}
              dataSource={themeTerms}
              textFieldStyle={style.tf}
              labelStyle={{top:-10}}
              inputStyle ={{marginTop:4}}
              fullWidth={true}
              onNewRequest={e=>console.log(e)}
            />
          }
          {!item.search &&
            <div>
          <FontIcon className={item.icon} style={style}/>
            {item.text}
            </div>
          }
          </div>
        )
      })}
      </div>
    );
  }
}

export default Search;
