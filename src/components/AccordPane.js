import React, { Component } from 'react';
import styles from './materialStyles.js';

import STImages from './STImages.js';
import SBNetworks from './SBNetworks.js';
import SText from './SText.js';

//drop-down toggles to hold nested info
//when clicked should open drawer to allow futher subselection

class CorePane extends Component {
  constructor(props) {
   super(props);
   this.state = {
   width:0,
   height: 0,
   top: true, //false = text
   bottom: true,

   };
   this.togglePaneT= this.togglePaneT.bind(this);
   this.togglePaneB= this.togglePaneB.bind(this);
 }

 componentDidMount(){
   console.dir(document.getElementById('sidePane').clientWidth)
   var wide = document.getElementById('sidePane').clientWidth
   var height = wide*.66 - styles.tabSize.height

   this.setState({width:wide, height})
 }

 togglePaneT = () => this.setState({top: !this.state.top});
 togglePaneB = () => {this.setState({bottom: !this.state.bottom}); console.log(this.state.bottom)};

  render() {

    return (
              <div className="col pane" id="sidePane">
                {this.state.top &&
                  <STImages hi={this.state.height} actions={this.togglePaneT} />
                }
                {!this.state.top &&
                  <SText hi={this.state.height} actions={this.togglePaneT} />
                }
                {this.state.bottom &&
                  <SBNetworks hi={this.state.height} actions={this.togglePaneB} />
                }
                {!this.state.bottom &&
                  <SText hi={this.state.height} actions={this.togglePaneB} />
                }
                log in here
              </div>
    );
  }
}

export default CorePane;
