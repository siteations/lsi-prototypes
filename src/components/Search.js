import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
   super(props);
   this.state = {}// defer?
 }

  render() {
    var sections = ['search full-text', 'by index', 'by theme/tag', 'biblio', 'log-in', 'about', 'credits']
    return (
      <div className="navBar row">
      <div className="col-4 font-sm">
      basic mock-up without styling for considering nav nesting, control flow of multi-pane structure
      </div>
      {sections.map(item=>{
        return (
          <div className='col font-m'>
          {item}
          </div>
        )
      })}
      </div>
    );
  }
}

export default Search;
