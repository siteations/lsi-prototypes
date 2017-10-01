import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
      title: ''
   }
 }

 componentDidMount() {
   this.serverRequest = axios.get('http://localhost/api/events').then(event =>{
         this.setState({
              title: JSON.stringify(event.data[0].field_organizer[0].value)
          });
     });
}

  render() {


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">testing</h1>
        </header>
        <p className="App-intro">
          {this.state.title}
        </p>
      </div>
    );
  }
}

export default App;
