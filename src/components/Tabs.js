import React, { Component } from 'react';
import { connect } from 'react-redux';

import EnlargeFull from './EnlargeFull.js';

import {setPanesTabs} from '../action-creators/paneActions.js';
import {setUpdate} from '../action-creators/navActions.js';

class Tab extends Component {
//const STImages = function (props) {
  constructor(props) {
   super(props);
   this.state = {};
 }

 updateTab = (type,content,value) => {
    console.log(type,content,value);
    this.props.setPanesTabs(type,content,value);
    this.props.setUpdate(true);
 }

  render(){

  	return (
      <div className='row tabSets' style={{height: '33px'}}>
        {(this.props.placement === 'main') && //offset when large
          <div className='col tabSets'>
            <EnlargeFull />
          </div>
        }
        {this.props.buttons.map((item, i)=>{
          return (
            <div className={`col tabButtons ${(item.value===this.props.pane[this.props.placement+'Tab'])? 'underline' : '' }`} value={item.value} onClick={e=>this.updateTab(this.props.placement,this.props.pane[this.props.placement], item.value)}>
              <p className="text-center" >
                {item.label}
              </p>
            </div>
                  )
        })

        }
      </div>
  	)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPanesTabs: (type, content, tab) => {
        dispatch(setPanesTabs(type, content, tab));
    },
    setUpdate: (bool) =>{
      dispatch(setUpdate(bool));
    },
  }
}

const Tabs = connect(mapStateToProps, mapDispatchToProps)(Tab);

export default Tabs;
