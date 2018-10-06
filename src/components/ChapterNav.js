import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';



import {drawer, setChapterDrawer, setChpPara, setUpdate, setCoreText} from '../action-creators/navActions.js';
import {setSiteData} from '../action-creators/siteActions.js';
import {loadResources, loadTags, setSelResources} from '../action-creators/resActions.js';
//import {setSelFig, setSelImg} from '../action-creators/imgActions.js';

//drop-down toggles to hold nested info
//when clicked should open drawer to allow futher subselection

class ChapterN extends Component {
  constructor(props) {
   super(props);
   this.state = {open: false, value: 1, type: 'chapter', theme: 'site', drawerTitle:''};
 }


  componentDidMount() {

     this.props.setUpdate(true);
     //this.props.loadTags();
     //this.props.loadResources(null, null);
  }


//handleChangeHome = (event, index, value) => this.setState({home:value}, this.props.info.history.push(value));

 toggleLoad (item) {
 		this.setState({drawerTitle: 'Chapters: '+drawer[item].join(', ')});
 		this.props.setChapterDrawer(this.props.nav.text, item);
 		this.props.setUpdate(true)
 		this.handleToggle()
 	}


 	selectSite (chp, para, id, name){
 		this.props.setChpPara(chp, para)
 		this.props.setSiteData(id, name)

 		this.props.setUpdate(true)
 		//this.scrollToWithContainer(para+'-section')
 		this.handleClose()
 	}

 	selectChapter (chp) {
 		this.props.setChpPara(chp, 999)
    this.props.setUpdate(true)
 		this.handleClose()
 	}

 	selectSubChapter (chp, para) {
 		this.props.setChpPara(chp, para)
    this.props.setUpdate(true)
 		this.handleClose()
 	}


  handleToggle(){this.setState({open: !this.state.open})};

  handleToggleTheme(e){
    this.setState({open: !this.state.open});
    this.setState({theme:e.target.offsetParent.id})
  };

  handleClose(){this.setState({open: false})};

  handleChapTheme = (event, index, value) => {
  	this.setState({value})
  	if (value === 1){this.setState({type: 'chapter'})} else { this.setState({type: 'theme'}) };
	};

  render() {
  	var array = [0, 1, 2, 3, 4, 5];
  	var arraytheme = ['site', 'science', 'social', 'sensory'];
  	var tClass = (this.state.type === 'theme')?'font-sm': ''

    return (
      <div className="row navBar grbck">
	      <div className='col eveleth' style={{height: '40px'}}>
	      	<div className={`p10 ${tClass}`}>
        <SelectField
          floatingLabelText="Navigate by:"
          value={this.state.value}
          onChange={this.handleChapTheme}
          style={{height:32}}
          floatingLabelStyle={{top:'10px'}}
          iconStyle={{height:12, top:-24}}
          labelStyle={{top:-12, height:'', lineHeight:'', fontFamily: 'Eveleth'}}
        >
          <MenuItem value={1} primaryText="Chapters" />
          <MenuItem value={2} primaryText="Themes" />
        </SelectField>
	      	</div>
	      </div>
	      {this.state.type === 'chapter' &&
	      array.map(item=>{
	      	return (
			      <div className='col'>
			      	<FlatButton
			      	onClick={e=>this.toggleLoad(item)}
			      	label={`${this.state.type} ${drawer[item].join(', ')}`}
			      	fullWidth={true}
			      	/>

						  <Drawer
			          docked={false}
			          width={450}
			          open={this.state.open}
			          onRequestChange={(open) => this.setState({open})}
			          overlayStyle={{opacity:'.15'}}
			        >
			          <MenuItem onClick={this.handleClose}>{this.state.drawerTitle}</MenuItem>
			          <Divider inset={true} />
			          {this.props.nav.chpDrawer.map(drawer=>{
			          	if (drawer.sites===null){
			          		var chpt = [<Divider />,<MenuItem onClick={e=>this.selectChapter(drawer.id)} insetChildren={false} style={{fontFamily:'Eveleth'}}>{`${drawer.id}: ${drawer.titles.title}`}</MenuItem>, <Divider />]
			          		var items = drawer.headers.map(header=>{
							      	return <MenuItem primaryText={header.value}  onClick={e=>this.selectSubChapter(drawer.id, header.p)} insetChildren={header.value.search(/I\.|II\.|III\.|IV\.|V\.|VI\.|VII\.|VIII\.|IX\./g) === -1}/>
							      })
							      var arr = chpt.concat(items);
							      return arr;


			          	} else {
			          		var elems=[<MenuItem primaryText={`Chapter ${drawer.id} Sites`} />,
							          			<Divider />];
							      var sites = drawer.sites.map(site=>{
							      	return (<MenuItem primaryText={site.value}  onClick={e=>this.selectSite(drawer.id, site.p[0], site.id, site.value)}/>)
							      })
							      var arrSites = elems.concat(sites);

							      var chpt2 = [<Divider />, <MenuItem onClick={e=>this.selectChapter(drawer.id)} insetChildren={false} style={{fontFamily:'Eveleth'}}>{`${drawer.id}: ${drawer.titles.title}`}</MenuItem>, <Divider />]
							      var subsites = [ <MenuItem primaryText={'Chp '+drawer.id+' sites'} style={{fontStyle: 'italic'}} rightIcon={<ArrowDropRight />} insetChildren={true} menuItems={arrSites} /> , <Divider />]
							      var items2 = drawer.headers.map(header=>{
							      	return <MenuItem primaryText={header.value}  onClick={e=>this.selectSubChapter(drawer.id, header.p)} insetChildren={header.value.search(/I\.|II\.|III\.|IV\.|V\.|VI\.|VII\.|VIII\.|IX\./g) === -1}/>
							      })
							      var arr2 = chpt2.concat(subsites, items2);

			          		return arr2;
			          	}

			          	})

			          }
			        </Drawer>

			      </div>
	      	        )
	      })}
	      {this.state.type === 'theme' &&
	      		      arraytheme.map(item=>{
	      	return (
			      <div className='col'>
			      	<FlatButton
			      	onClickCapture={e =>this.handleToggleTheme(e)}
			      	label={`explorations of ${item}`}
			      	fullWidth={true}
			      	id={item}
			      	/>
			      <Drawer
			          docked={false}
			          width={300}
			          open={this.state.open}
			          onRequestChange={(open) => this.setState({open})}
			          overlayStyle={{opacity:'.15'}}
			        >
			          <MenuItem onClick={this.handleClose}>{this.state.theme}</MenuItem>
			          <Divider inset={true} />
			          <MenuItem onClick={this.handleClose} insetChildren={true} >{`${this.state.theme} subtheme (tbd)`}</MenuItem>
			          <MenuItem
				          primaryText={`${this.state.theme} subtheme (tbd)`}
				          rightIcon={<ArrowDropRight />}
				          insetChildren={true}
				          menuItems={[
				          			<MenuItem primaryText={`show all ${this.state.theme} subtheme works`}  onClick={this.handleClose}/>,
				          			<Divider />,
				          			<MenuItem primaryText={`${this.state.theme} sub2a`}  onClick={this.handleClose}/>,
				                <MenuItem primaryText={`${this.state.theme} sub2b`}  onClick={this.handleClose}/>,
				                <MenuItem primaryText={`${this.state.theme} sub2c`}  onClick={this.handleClose}/>,
				                <MenuItem primaryText={`${this.state.theme} sub2d`}  onClick={this.handleClose}/>,
				              ]} />
			          <MenuItem onClick={this.handleClose} insetChildren={true} >{`${this.state.theme} subtheme (tbd)`}</MenuItem>
			        </Drawer>

			      </div>
	    )}
	      	)}

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pane: state.pane,
    nav: state.nav,
    res: state.res,
    site: state.site,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setChapterDrawer: (text, button) => {
        dispatch(setChapterDrawer(text, button));
    },
    setChpPara: (chp, para) => {
        dispatch(setChpPara(chp, para));
    },
    setSiteData: (id, name)=>{
    	dispatch(setSiteData(id, name));
    },
    setUpdate: (bool) =>{
    	dispatch(setUpdate(bool));
    },
    loadResources: (type, id)=>{
    	dispatch(loadResources(type, id));
    },
    setSelResources: (resList)=>{
      dispatch(setSelResources(resList));
    },
    // setSelFig: (chp)=>{
    //   dispatch(setSelFig(chp));
    // },
    // setSelImages: (chp)=>{
    //   dispatch(setSelImages(chp));
    // },
    loadTags:()=>{
    	dispatch(loadTags());
    }
  }
}

const ChapterNav = connect(mapStateToProps, mapDispatchToProps)(ChapterN);

export default ChapterNav;
