import React, { Component } from 'react';
import './css/bootstrap.css';
import './css/font-awesome.css';
import './css/App.css';

import Search from './components/Search.js';
import Chapternav from './components/ChapterNav.js';

//import axios from 'axios';

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {}// defer?
 }

// this is just for testing connections to fake drupal backend
// if we're setting up postgreSQL (please!) disreguard this, also if we're going the react route (ha), I'd prefer to go explicit with redux routing

// make sure mamp is running the local drupal version (and seed with some materials) for testing
/* componentDidMount() {
   this.serverRequest = axios.get('http://localhost/api/events').then(event =>{
         this.setState({
              //title: JSON.stringify(event.data[0])
              //event.data[0].field_organizer[0].value
          });
              console.log(event.data[0])
     });
}*/



  render() {
    return (
      <div className="App">
        <div id="navMasters">
          {/* top bar for search via multiple methods - index to dropdown, themes to dropdowns */}
          <Search />
          {/* second bar for listing of chapters as condensed dropdowns */}
          <Chapternav type="chapter"/>
          {/* third bar for listing of themes as condensed dropdowns */}
          <Chapternav type="theme"/>
        </div>
        <div id="corePanels" className="row p10 justify-content-center">
          <div className='col-11'>
            <div className="row">
              <div className="col-8 pane">
                main here
              </div>
              <div className="col-4 pane">
                side here
              </div>
            </div>
          </div>
        </div>
        <div id="footer" className="font-sm">
          <div className="row align-items-center">
            basic mock-up without styling for considering nav nesting, control flow of multi-pane structure
          </div>
        </div>
      </div>
    );
  }
}

export default App;
