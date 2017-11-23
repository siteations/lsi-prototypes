//-------------IMPORT BASIC OBJECTS AS PLACEHOLDERS FOR DB STRUCTURE----------------------

//import sampleText from '../non-db/sampleText.js';

//import chapterList from '../non-db/chapterList.js';
//import imageList from '../non-db/imageList.js';
//import themeList from '../non-db/themeList.js';

//import siteList from '../non-db/siteList.js';
//import agentList from '../non-db/agentList.js';
//import mediaList from '../non-db/mediaList.js';


import axios from 'axios';

//-------------------CONSTANTS

//------------PANES REDUCER... SWITICHING BETWEEN WINDOWS

//set or reset main panel
export const SET_MP = 'SET_MP';
export const SET_MP_TAB = 'SET_MP_TAB';
	//text, networks, images
	//searches, add items, browse items

export const SET_SP_TOP = 'SET_SP_TOP'
export const SET_SP_TTAB = 'SET_SP_TTAB';
export const SET_SP_BOTTOM = 'SET_SP_BOTTOM'
export const SET_SP_BTAB = 'SET_SP_BTAB';
//images & themes, networks & geographies

/* internal elements, like specific paragraph or case or agent in different reducer */

//-------------------ACTION CREATORS - vanilla loading of information
export const setMP = (paneType) => {
	return {
		type: SET_MP,
		paneType
	};
};

export const setMPTab = (paneTab) => {
	return {
		type: SET_MP_TAB,
		paneTab
	};
};

export const setSPTop = (sTopType) => {
	return {
		type: SET_SP_TOP,
		sTopType
	};
};

export const setSTTab = (sTopTab) => {
	return {
		type: SET_SP_TTAB,
		sTopTab
	};
};

export const setSPBottom = (sBottomType) => {
	return {
		type: SET_SP_BOTTOM,
		sBottomType
	};
};

export const setSBTab = (sBottomTab) => {
	return {
		type: SET_SP_BTAB,
		sBottomTab
	};
};

//note: the tabs for logging in to the system and editing materials will be their own additions to the user reducer

//-------------------reducers && initial info

const initMap = {
	main: 'text',
	mainTab: 'a',

	top:'images',
	topTab: 'a' ,

	bottom: 'networks',
	bottomTab: 'a',

};



export const paneReducer = (prevState = initMap, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_MP:
		newState.main = action.paneType;
		break;

	case SET_MP_TAB:
		newState.mainTab = action.paneTab;
		break;

	case SET_SP_TOP:
		newState.top = action.sTopType;
		break;

	case SET_SP_TTAB:
		newState.topTab = action.sTopTab;
		break;

	case SET_SP_BOTTOM:
		newState.bottom = action.sBottomType;
		break;

	case SET_SP_BTAB:
		newState.bottomTab = action.sBottomTab;
		break;

	default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

export const setMainPane = (type, tab) => dispatch => {
	console.log('main ', type, tab)
  dispatch(setMP(type));
  dispatch(setMPTab(tab));
};

export const setSideTop = (type, tab) => dispatch => {
	console.log('side ', type, tab)
  dispatch(setSPTop(type));
  dispatch(setSTTab(tab));
};

export const setSideBottom = (type, tab) => dispatch => {
  dispatch(setSPBottom(type));
  dispatch(setSBTab(tab));
};

