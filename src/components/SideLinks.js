import React, { Component } from 'react';
import { connect } from 'react-redux';

class SideL extends Component {
  constructor(props) {
   super(props);
   this.state = {} //defer definitions
 	}

 	render() {

    var items = this.props.items;
    var actions = this.props.actions;
    var i = this.props.iter;

    return (
		       <div className= 'col-3 small'>
           <em className="small grey nb">(pg: {items.page})</em>
        		<ul>
        			{items.figures &&
                    <li id={items.figures.id} value={i}><em>{items.figures.figNum? 'fig:' : ''}</em><span className="cursor">  {items.figures.figD ? items.figures.figD + '...' : ''}</span></li>

              }
        			{items.sites &&
                items.sites.map(site=>{
                  return (
                    <li onClick={e=>actions.site(e.target.attributes.id.value, site.id, site.value)} id={i}><em>site:</em><span className="cursor"> {site.value}</span></li>
                          )
                })
        			}
              {items.resources && !items.figures &&
                items.resources.map(res=>{
                  return (
                    <li onClick={e=>actions.resource(res.id, i)} value={i}><em>resource:</em> <span className="cursor"> {res.value}</span></li>
                          )
                })
              }
              {items.notes &&
                items.notes.map(note=>{
                  return (
                <li onClick={e=>actions.note(note.value, i)} value={i} ><em>note:</em> <span className="cursor"> {note.value}</span> </li>
                )
                })
              }
        		</ul>
        	</div>

        	);
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
}

const SideLinks = connect(mapStateToProps, mapDispatchToProps)(SideL);


export default SideLinks;
