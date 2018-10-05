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
                    <li className="cursor" id={items.figures.id} value={i}><em>{items.figures.figNum? 'fig:' : ''}</em> {items.figures.figD ? items.figures.figD + '...' : ''}</li>

              }
        			{items.sites &&
                items.sites.map(site=>{
                  return (
                    <li className="cursor" onClick={e=>actions.site(e.target.attributes.id.value, site.id, site.value)} id={i}><em>site:</em> {site.value}</li>
                          )
                })
        			}
              {items.resources && !items.figures &&
                items.resources.map(res=>{
                  return (
                    <li className="cursor" onClick={e=>actions.resource(res.id, e)} value={i}><em>resource:</em> {res.value}</li>
                          )
                })
              }
              {items.notes &&
                items.notes.map(note=>{
                  return (
                <li className="cursor" onClick={e=>actions.note(note.value, e)} value={i} ><em>note:</em> {note.value}</li>
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
