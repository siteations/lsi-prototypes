import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/bootstrap.css';
import './css/font-awesome.css';
import 'react-image-gallery/styles/css/image-gallery.css';
// import './css/assembly.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './css/App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey600, grey800, grey400, cyan900, grey100, grey500, grey300, darkBlack, white, fullBlack} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

import Search from './components/Search.js';
import Chapternav from './components/ChapterNav.js';
import FullPane from './components/FullPane.js';
import CorePane  from './components/CorePane.js';
import AccordPane from './components/AccordPane.js';


const muiTheme = getMuiTheme({
  fontFamily: 'Texta, sans-serif',
  palette: {
    primary1Color: grey400,
    primary2Color: grey600,
    primary3Color: grey800,
    accent1Color: grey800,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan900,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});



class App extends Component {
  constructor(props) {
   super(props);
   this.state = {}// defer?
 }

// this is just for testing connections to fake drupal backend
// if we're setting up postgreSQL disreguard this

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
    console.log('address', this.props);
    return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <div id="navMasters">
          {/* top bar for search via multiple methods - index to dropdown, themes to dropdowns */}
          <Search />
          {/* second bar for listing of chapters as condensed dropdowns */}
          <Chapternav history={this.props.history} />
        </div>
        <div id="corePanels" className="row p10 justify-content-center">
          <div className='col-11'>
            {!this.props.pane.fullscreen &&
            <div className="row">
              <CorePane history={this.props.history} />
              <AccordPane history={this.props.history} />
            </div>
            }
            {this.props.pane.fullscreen &&
              <div>
              <FullPane history={this.props.history} />
              </div>
            }
          </div>
        </div>
        <div id="footer" className="font-sm" style={{height:24}}>
          <div className="row align-items-center">
            basic mock-up with minimal styling for considering nav nesting, control flow of multi-pane structure
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    }
}

const Apps = connect(mapStateToProps, null)(App);

export default Apps;
