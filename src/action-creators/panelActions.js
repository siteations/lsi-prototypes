//DATABASE AND NON-DATABASE VERSION ARE THE SAME

// //-------------------CONSTANTS

import {panelsOther} from '../non-db/panelsOther.js';


//responding to resizing
export const SET_PANELSIZE = 'SET_PANELSIZE';
export const SET_PANELRATIO = 'SET_PANELRATIO';

export const SET_TITLE = 'SET_TITLE';
export const SET_SUBTITLE = 'SET_SUBTITLE';

export const SET_NARROBJ = 'SET_NARROBJ';
export const SET_IMAGESIZES = 'SET_IMAGESIZES';
//export const SET_BIBLIOALL ='SET_BIBLIOALL';


//-------------------ACTION CREATORS - vanilla loading of information
export const setPanelSize = (panelSize) => {
	return {
		type: SET_PANELSIZE,
		panelSize
	};
};

export const setPanelRatio = (panelRatio) => {
	return {
		type: SET_PANELRATIO,
		panelRatio
	};
};

export const setTitle = (title) => {
	return {
		type: SET_TITLE,
		title
	};
};

export const setSubtitle = (subtitle) => {
	return {
		type: SET_SUBTITLE,
		subtitle
	};
};

export const setNarrObj = (narrObj) => {
	return {
		type: SET_NARROBJ,
		narrObj
	};
};

export const setImageSizes = (sizes) => {
	return {
		type: SET_IMAGESIZES,
		sizes,
	};
};


//-------------------reducers && initial info

const initPanel = {
	panelSize: [0,0], //width, height
	panelRatio: 1, // width/height

	title: "Merlo's Map",
	subtitle: 'The Religious Geography of Venice',

	imageWidth: 0,
	narrObj: panelsOther['intro']['obj'],
	// biblioAll: [],
};


export const panelReducer = (prevState = initPanel, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_PANELSIZE:
		newState.panelSize = action.panelSize;
		break;

	case SET_PANELRATIO:
		newState.panelRatio = action.panelRatio;
		break;

	case SET_TITLE:
		newState.title = action.title;
		break;

	case SET_SUBTITLE:
		newState.subtitle = action.subtitle;
		break;

	case SET_IMAGESIZES:
		newState.imageWidth = action.sizes;
		break;

	case SET_NARROBJ:
		newState.narrObj = action.narrObj;
		break;

	default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

// optimistic
export const setTitlesCore = (titles) => dispatch => {
  dispatch(setTitle(titles[0]));
  dispatch(setSubtitle(titles[1]));
};

export const setNarr = (narr) => dispatch => {
	dispatch(setNarrObj(narr));;
}

export const setPanelSizing = (size, ratio) => dispatch => {
	dispatch(setPanelSize(size));
	dispatch(setPanelRatio(ratio));
	dispatch(setImageSizes(size[0]-20));
}
