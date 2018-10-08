//-------------IMPORT BASIC OBJECTS AS PLACEHOLDERS FOR DB STRUCTURE----------------------
import axios from 'axios';
import Promise from 'bluebird';
import store from '../store';

import fig from '../data/imageList_chapterSorting.js';
//import siteFig from '../data/09resources_postZotero.js';


//-------------------CONSTANTS

export const SET_FIG_ALL= 'SET_FIG_ALL';
export const SET_FIG_ID = 'SET_FIG_ID';
export const SET_FIG_MATCH = 'SET_FIG_MATCH';
export const SET_FIG_OPTIONS = 'SET_FIG_OPTIONS';
export const SET_FIG_TEXT = 'SET_FIG_TEXT';

export const SET_FIG_ACTIVE = 'SET_FIG_ACTIVE';
export const SET_FIG_GALLERY = 'SET_FIG_GALLERY';

export const SET_SITE_ACTIVE = 'SET_SITE_ACTIVE';
export const SET_SITE_GALLERY = 'SET_SITE_GALLERY';

//-------------------ACTION CREATORS - vanilla loading of information
export const getFigAll = (allFig) => {
	return {
		type: SET_FIG_ALL,
		allFig
	};
};

export const getFigId = (id) => {
	return {
		type: SET_FIG_ID,
		id
	};
};

export const getFigMatch = (match) => {
	return {
		type: SET_FIG_MATCH,
		match
	};
};

export const getFigOptions = (options) => {
	return {
		type: SET_FIG_OPTIONS,
		options
	};
};

export const getFigText= (text) => {
	return {
		type: SET_FIG_TEXT,
		text
	};
};

export const getFigActive = (bool) => {
	return {
		type: SET_FIG_ACTIVE,
		figActive: bool
	};
};

export const getSiteActive = (bool) => {
	return {
		type: SET_SITE_ACTIVE,
		siteActive: bool
	};
};

export const getSiteGallery = (siteGallery) => {
	return {
		type: SET_SITE_GALLERY,
		siteGallery
	};
};

export const getFigGallery = (figGallery) => {
	return {
		type: SET_FIG_GALLERY,
		figGallery
	};
};


//note: the tabs for logging in to the system and editing materials will be their own additions to the user reducer

//-------------------reducers && initial info

const initMap = {
	allFig: {},

	id: '',
	match: {},
	options: [],
	text: {},

	figActive: false,
	siteActive: true,
	siteGallery: [], //array with descriptions, links by site or by figure options
	figGallery: [] //from options and option+text
};



export const imgReducer = (prevState = initMap, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

		case SET_FIG_ALL:
		newState.allFig = action.allFig;
		break;

		case SET_FIG_ID:
		newState.id = action.id;
		break;

		case SET_FIG_MATCH:
		newState.match = action.match;
		break;

		case SET_FIG_OPTIONS:
		newState.options = action.options;
		break;

		case SET_FIG_ACTIVE:
		newState.figActive = action.figActive;
		break;

		case SET_FIG_GALLERY:
		newState.figGallery = action.figGallery;
		break;

		case SET_SITE_ACTIVE:
		newState.siteActive = action.siteActive;
		break;

		case SET_SITE_GALLERY:
		newState.siteGallery = action.siteGallery;
		break;

		default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

export const loadFigures = () => dispatch => {
		const figures = {}
		fig.forEach(item=>{
			figures[item.id] = item;
		})
		dispatch(getFigAll(figures));
};

export const activateGallery = (type) => dispatch => {
		if (type==='figure'){
			dispatch(getFigActive(true));
			dispatch(getSiteActive(false));
		} else {
			dispatch(getFigActive(false));
			dispatch(getSiteActive(true));
		}
};


export const loadGallery = (imgArr, type) => dispatch => {
		if (type==='figure'){
			dispatch(getFigGallery(imgArr));
			dispatch(activateGallery('figure'));
		} else {
			dispatch(getSiteGallery(imgArr));
			dispatch(activateGallery());
		}
}
