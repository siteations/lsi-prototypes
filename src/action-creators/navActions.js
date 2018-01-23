//-------------IMPORT BASIC OBJECTS AS PLACEHOLDERS FOR DB STRUCTURE----------------------
import axios from 'axios';
import Promise from 'bluebird';
import {sampleText} from './xmlParsingUtil.js';

//import imageList from '../non-db/imageList.js';
//import siteList from '../non-db/siteList.js';

//import themeList from '../non-db/themeList.js';
//import agentList from '../non-db/agentList.js';
//import mediaList from '../non-db/mediaList.js';


export const drawer = {0:[0,1,2], 1: [3,4,5], 2: [6,7,8], 3: [9,10,11], 4:[12,13,14], 5: [15,16,17]}

//-------------------CONSTANTS

//------------PANES REDUCER... SWITICHING BETWEEN WINDOWS

//set or reset main panel
export const SET_CHP_DRW = 'SET_CHP_DRW';
//export const SET_THEME_DRW = 'SET_THEME_DRW';
	//text, networks, images
	//searches, add items, browse items

export const SET_CHP = 'LOAD_CHP'
export const SET_PARA = 'LOAD_PARA';
export const SET_PARAL = 'SAVE_PARAL';
export const SET_UP = "SET_UP";
export const SET_TEXT = 'LOAD_TEXT'
export const SET_TITLE = 'LOAD_TITLE';
export const SET_SITE_ID = 'SET_SITE_ID'
export const SET_SITE_NAME = 'SET_SITE_NAME';
//images & themes, networks & geographies

/* internal elements, like specific paragraph or case or agent in different reducer */

//-------------------ACTION CREATORS - vanilla loading of information
export const setChpDrawer = (drawerObj) => {
	return {
		type: SET_CHP_DRW,
		drawer: drawerObj
	};
};

export const setChapter = (chapterId) => {
	return {
		type: SET_CHP,
		chp:chapterId
	};
};

export const setPara = (paraId) => {
	return {
		type: SET_PARA,
		para: paraId
	};
};

export const setParaL = (paraId) => {
	return {
		type: SET_PARAL,
		paraL: paraId
	};
};

export const setSiteId = (siteId) => {
	return {
		type: SET_SITE_ID,
		siteId
	};
};

export const setSiteName = (siteName) => {
	return {
		type: SET_SITE_NAME,
		siteName
	};
};

export const setUp = (bool) => {
	return {
		type: SET_UP,
		setUp: bool
	};
};

export const setText = (text) => {
	return {
		type: SET_TEXT,
		text
	};
};


//note: the tabs for logging in to the system and editing materials will be their own additions to the user reducer

//-------------------reducers && initial info

const initMap = {
	chpDrawer: [],

	chp: 0,
	para: 0,
	paraL:0,

	siteId: 7000,
	siteName: 'Ermenonville',

	setUp:false,

	text: []
};



export const navReducer = (prevState = initMap, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_CHP_DRW:
		newState.chpDrawer = action.drawer;
		break;

	case SET_CHP:
		newState.chp = action.chp;
		break;

	case SET_TEXT:
		newState.text = action.text;
		break;

	case SET_PARA:
		newState.para = action.para;
		break;

	case SET_PARAL:
		newState.paraL = action.paraL;
		break;

	case SET_SITE_ID:
		newState.siteId = action.siteId;
		break;

	case SET_SITE_NAME:
		newState.siteName = action.siteName;
		break;

	case SET_UP:
		newState.setUp = action.setUp;
		break;

	default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

export const setChapterDrawer = (buttonid, drw) => dispatch => {
	if (buttonid !==null){
	Promise.all(sampleText())
  .then(res => {
		var drawerObj = drawer[buttonid].map(chpId=>{
			return {
				id: chpId,
				titles: res[chpId].titles,
				headers: res[chpId].headers,
				sites: res[chpId].sites,
			}
		})

	  dispatch(setChpDrawer(drawerObj));
  })
  .catch(err => console.error('Problem fetching current user', err));

	}

	if (buttonid === null && drw !== undefined){
		console.log('from updates', drw);
		var elm;
		for (var key in drawer){
			if (drawer[key].indexOf(drw)>-1){
				elm = key
			}
		}
		console.log(elm);
		var drawerObj = drawer[elm].map(chpId=>{
		return {
			id: chpId,
			titles: sampleText[chpId].titles,
			headers: sampleText[chpId].headers,
			sites: sampleText[chpId].sites,
		}
	})
  dispatch(setChpDrawer(drawerObj));
	}
};

export const setCoreText = () => dispatch => {
	Promise.all(sampleText())
  .then(res => {
  	dispatch(setText(res))
  })
  .catch(err => console.error('Problem fetching current user', err));
};

export const setChpPara = (chpId, paraId) => dispatch => {
  dispatch(setChapter(chpId));
  dispatch(setPara(paraId));
};

export const setChpParaL = (paraId) => dispatch => {
  dispatch(setParaL(paraId));
};

export const setSiteData = (id, name) => dispatch => {
  dispatch(setSiteId(id));
  dispatch(setSiteName(name));
};

export const setUpdate = (bool) => dispatch =>{
	dispatch(setUp(!bool));
}
