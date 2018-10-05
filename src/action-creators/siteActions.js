import sites1 from '../data/07sites_tng.js';
import sites2 from '../data/09sites_tng.js';

const sites = sites1.concat(sites2);

export const SET_SITE_ID = 'SET_SITE_ID'
export const SET_SITE_NAME = 'SET_SITE_NAME';
export const SET_SITE_OBJ = 'SET_SITE_OBJ';


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

export const setSiteObj= (siteObj) => {
	return {
		type: SET_SITE_OBJ,
		siteObj
	};
};

const initMap = {

	siteId: 7000,
	siteName: 'Ermenonville',
	siteObj: {}

};


export const siteReducer = (prevState = initMap, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_SITE_ID:
		newState.siteId = action.siteId;
		break;

	case SET_SITE_NAME:
		newState.siteName = action.siteName;
		break;

	case SET_SITE_OBJ:
		newState.siteObj = action.siteObj;
		break;

	default:
		return prevState;
	}

	return newState;

};

export const setSiteData = (id, name) => dispatch => {
  dispatch(setSiteId(id));
  dispatch(setSiteName(name));

  var siteHere =sites.filter(site=>{
  	return(+site.id === +id)
  });

  dispatch(setSiteObj(siteHere[0]));
};
