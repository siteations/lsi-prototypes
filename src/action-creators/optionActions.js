//OPTIONS REDUCER
import axios from 'axios';
import Promise from 'bluebird';

import {saved} from './siteActionsNDB.js'; //aws version

//layer view options
export const SET_COLOR = "SET_COLOR";
export const SET_ANNO = "SET_ANNO";
export const SET_ANNO_ZOOM = "SET_ANNO_ZOOM";
export const SET_KEY_LIST = "SET_KEY_LIST";
export const SET_KEY_FOCUS = "SET_KEY_FOCUS";

export const SET_PANEL_START ='SET_PANEL_START';
export const SET_PANEL_NONE = 'SET_PANEL_NONE';
export const SET_PANEL_SMALL = 'SET_PANEL_SMALL';
export const SET_PANEL_LARGE = 'SET_PANEL_LARGE';
export const SET_PANEL_MID = 'SET_PANEL_MID';

export const PLAY_TOUR = 'PLAY_TOUR';
export const GET_ALL_TOURS = 'GET_ALL_TOURS';
export const GET_CURR_TOUR = 'GET_CURR_TOUR';


// //-------------------ACTION CREATORS - vanilla loading of information
export const setColor = (bool) => {
	return {
		type: SET_COLOR,
		color: bool
	};
};

export const playTour = (bool) => {
	return {
		type: PLAY_TOUR,
		play: bool
	};
}

export const setAnno = (bool) => {
	return {
		type: SET_ANNO,
		anno: bool
	};
};

export const setAnnoZoom = (bool) => {
	return {
		type: SET_ANNO_ZOOM,
		annoZoom: bool
	};
};

export const setKeyList = (keys) => {
	return {
		type: SET_KEY_LIST,
		keys: keys
	};
};

export const setKeyFocus = (keyId) => {
	return {
		type: SET_KEY_FOCUS,
		keyId
	};
};

export const setPanelStart = (bool) => {
	return {
		type: SET_PANEL_START,
		bool
	};
};

export const setPanelNone = (bool) => {
	return {
		type: SET_PANEL_NONE,
		bool
	};
};

export const setPanelSmall = (bool) => {
	return {
		type: SET_PANEL_SMALL,
		bool
	};
};

export const setPanelLarge = (bool) => {
	return {
		type: SET_PANEL_LARGE,
		bool
	};
};

export const setPanelMid = (bool) => {
	return {
		type: SET_PANEL_MID,
		bool
	};
};

export const getAllTours = (tours) =>{
	return {
		type: GET_ALL_TOURS,
		tours,
	}
}

export const getTour = (tourId) =>{
	return {
		type: GET_CURR_TOUR,
		tourId,
	}
}


const initOptions = {
	color: false,
	anno: true,
	annoZoom: true,
	currKeyList: [],
	currKeyFocus: 0, //id of open options

	panelStart: false,
	panelNone: false,
	panelSmall: true,
	panelLarge: false,
	panelMid: false,

	playTour: false,
	currTour: 1,
	allTours: {},

};


export const optionReducer = (prevState = initOptions, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_COLOR:
		newState.color = action.color;
		break;

	case PLAY_TOUR:
		newState.playTour = action.play;
		break;

	case GET_ALL_TOURS:
		newState.allTours = action.tours;
		break;

	case GET_CURR_TOUR:
		newState.currTour = action.tourId;
		break;

	case SET_ANNO:
		newState.anno = action.anno;
		break;

	case SET_ANNO_ZOOM:
		newState.annoZoom = action.annoZoom;
		break;

	case SET_KEY_LIST:
		newState.currKeyList = action.keys;
		break;

	case SET_KEY_FOCUS:
		newState.currKeyFocus = action.keyId;
		break;

	case SET_PANEL_START:
		newState.panelStart = action.bool;
		break;

	case SET_PANEL_NONE:
		newState.panelNone = action.bool;
		break;

	case SET_PANEL_SMALL:
		newState.panelSmall = action.bool;
		break;

	case SET_PANEL_LARGE:
		newState.panelLarge = action.bool;
		break;

	case SET_PANEL_MID:
		newState.panelMid = action.bool;
		break;

	default:
		return prevState;
	}

	return newState;

};


/* ------------       DISPATCHERS     ------------------ */

// optimistic
export const updateColor = bool => dispatch => {
  dispatch(setColor(bool));
};

export const updateAnno = bool => dispatch => {
  dispatch(setAnno(bool));
};

export const updateDetail = bool => dispatch => {
  dispatch(setAnnoZoom(bool));
};

export const togglePlay = bool => dispatch => {
  dispatch(playTour(bool));
};


export const updatePanelStart = () => dispatch => { // positive choice
	dispatch(setPanelStart(false));

};

export const updatePanelNone = () => dispatch => { // positive choice
  dispatch(setPanelNone(true));
  dispatch(setPanelSmall(false));
  dispatch(setPanelLarge(false));
  dispatch(setPanelMid(false));
};

export const updatePanelSmall = () => dispatch => {
  dispatch(setPanelNone(false));
  dispatch(setPanelSmall(true));
  dispatch(setPanelLarge(false));
  dispatch(setPanelMid(true));
};

export const updatePanelLarge = () => dispatch => {
    dispatch(setPanelNone(false));
  dispatch(setPanelSmall(false));
  dispatch(setPanelLarge(true));
};

export const updatePanelMid = () => dispatch =>{
	dispatch(setPanelNone(false));
  dispatch(setPanelSmall(true));
  dispatch(setPanelLarge(false));
	dispatch(setPanelMid(false));
}


export const getAllToursThemes = () => dispatch => {
	const allTours = axios.get('/api/tours')
			.then(responses => {
				return responses.data;
			})
			.then((results) => {
			var tours={}; //arr to object

	    results.forEach(site=>{

	      if (tours[site.tourId]){
	        var arr = tours[site.tourId];
	        tours[site.tourId] = arr.concat([site]);
	      } else {
	        tours[site.tourId] = [site];
	      }
	    });

			dispatch(getAllTours(tours));
		})
		.catch(console.log);

}

export const setCurrTour = (tour) => dispatch => {
	console.log('gothere', tour);
	dispatch(getTour(tour));
}

export const addTourEntry = (obj) => dispatch => {

	axios.post('/api/tours', obj)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(getAllToursThemes());
	    dispatch(saved(true));
			})
	   .catch(console.log);

}

export const removeTourEntry = (id) => dispatch => {

	axios.delete(`/api/tours/${id}`)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(getAllToursThemes());
	    dispatch(saved(true));
			})
	   .catch(console.log);

}

export const deleteTour = (id) => dispatch => {

	console.log('also got to before call')
	axios.delete(`/api/tours/all/${id}`)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(getAllToursThemes());
			})
	   .catch(console.log);

}


