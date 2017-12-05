//-------------IMPORT BASIC OBJECTS AS PLACEHOLDERS FOR DB STRUCTURE----------------------

import sampleText from '../data/Gilpin.js';

//import imageList from '../non-db/imageList.js';
//import siteList from '../non-db/siteList.js';

//import themeList from '../non-db/themeList.js';
//import agentList from '../non-db/agentList.js';
//import mediaList from '../non-db/mediaList.js';


import axios from 'axios';

export const drawer = {0:[0,1,2], 1: [3,4], 2: [5,6], 3: [7,8], 4:[9,10], 5: [11,12]}

//-------------------CONSTANTS

//------------PANES REDUCER... SWITICHING BETWEEN WINDOWS

//set or reset main panel
export const SET_CHP_DRW = 'SET_CHP_DRW';
//export const SET_THEME_DRW = 'SET_THEME_DRW';
	//text, networks, images
	//searches, add items, browse items

export const SET_CHP = 'LOAD_CHP'
export const SET_PARA = 'LOAD_PARA';
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


//note: the tabs for logging in to the system and editing materials will be their own additions to the user reducer

//-------------------reducers && initial info

const initMap = {
	chpDrawer: [],

	chp: 0,
	para: 0,

	siteId: 7005,
	siteName: 'Stowe',

	setUp:false
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

	case SET_PARA:
		newState.para = action.para;
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
	var drawerObj = drawer[buttonid].map(chpId=>{
		return {
			id: chpId,
			title: sampleText[chpId].title,
			sites: sampleText[chpId].sites,
		}
	})
  dispatch(setChpDrawer(drawerObj));
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
			title: sampleText[chpId].title,
			sites: sampleText[chpId].sites,
		}
	})
  dispatch(setChpDrawer(drawerObj));
	}
};

export const setChpPara = (chpId, paraId) => dispatch => {
  dispatch(setChapter(chpId));
  dispatch(setPara(paraId));
};

export const setSiteData = (id, name) => dispatch => {
  dispatch(setSiteId(id));
  dispatch(setSiteName(name));
};

export const setUpdate = (bool) => dispatch =>{
	dispatch(setUp(!bool));
}
