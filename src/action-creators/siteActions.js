import sites1 from '../data/07sites_tng.js';
import sites2 from '../data/09sites_tng.js';
import siteImg from '../data/imageObj_chpSites.js';

const sites = sites1.concat(sites2);


export const SET_SITE_ID = 'SET_SITE_ID'
export const SET_SITE_NAME = 'SET_SITE_NAME';
export const SET_SITE_OBJ = 'SET_SITE_OBJ';
export const SET_SITE_ALL= 'SET_SITE_ALL';
export const SET_SITE_IMG= 'SET_SITE_IMG';


export const setSiteId = (siteId) => {
	return {
		type: SET_SITE_ID,
		siteId
	};
};

export const setAllSites = (allSites) => {
	return {
		type: SET_SITE_ALL,
		allSites
	};
};

export const setAllImg = (allSitesImg) => {
	return {
		type: SET_SITE_IMG,
		allSitesImg
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
	siteObj: {
    "name": ["Ermenonville"],
    "id": 7000,
    "chp": "07",
    "type": "site",
    "count": 10,
    "tng": "7009163",
    "g_address": "60950 Ermenonville, France",
    "g_latitude": 49.127692,
    "g_longitude": 2.697813,
    "g_id": "ChIJg0zijuQk5kcRshsaj4ia02g"
},
	allSites: {},
	allSitesImg: {},

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

	case SET_SITE_ALL:
		newState.allSites = action.allSites;
		break;

	case SET_SITE_IMG:
		newState.allSitesImg = action.allSitesImg;
		break;

	default:
		return prevState;
	}

	return newState;

};

export const setSiteData = (id, name) => dispatch => {
  dispatch(setSiteId(id));
  (!name)? name = sites.filter(site=> +site.id===+id)[0].name[0] : null;
  dispatch(setSiteName(name));

  var siteHere =sites.filter(site=>{
  	return(+site.id === +id)
  });

  dispatch(setSiteObj(siteHere[0]));
};

export const loadSites = () => dispatch => {
	var siteObjs={}
	sites.forEach(item=>{
		siteObjs[item.id] = item;
	})
	//console.log(siteObjs);
  dispatch(setAllSites(siteObjs));
  dispatch(setAllImg(siteImg));
};


