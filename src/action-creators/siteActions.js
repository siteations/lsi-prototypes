import axios from 'axios';
import Promise from 'bluebird';
//---------------------------PRE-DB / PRE-REDUX PLACEHOLDERS---------------------------

//import * as sites from '../non-db/sites.json';

// //var cirMain = siteSeed;
// var cirMinor = detailSeed;
// var narrativeTest = narrativeSeed;
// var imageTest = imageSeed;

//-------------------CONSTANTS

const	layersFullList = ['parish churches',"basilica", "plague churches", "monastery", "convent", "non-catholic communities", "processions", "printing", "textual consumption" ];

//SITE REDUCER

//layers all & selected, sites all & selected
export const GET_ALL_SITES = 'GET_ALL_SITES';
export const GET_FILTERED_SITES = 'GET_FILTERED_SITES'

export const GET_CURR_SITE = 'GET_CURR_SITE';
export const GET_CURR_SITEZOOM = 'GET_CURR_SITEZOOM';

export const GET_CURR_DETAIL = 'GET_CURR_DETAIL';
export const GET_CURR_NARR = 'GET_CURR_NARR';

export const GET_GEN_DETAIL ='GET_GEN_DETAIL';
export const GET_GEN_NARR ='GET_GEN_NARR';
export const GET_GEN_IMG = 'GET_GEN_IMG';
export const GET_GEN_BIB = 'GET_GEN_BIB';

export const GET_CURR_IMGS = 'GET_CURR_IMGS';

export const SET_MINOR_ID = 'SET_MINOR_ID';

//layers all & selected for filteration
export const GET_ALL_LAYERS= 'GET_All_LAYERS';
export const GET_CURR_LAYERS= 'GET_CURR_LAYERS';
export const ADD_CURR_LAYERS='ADD_CURR_LAYERS';
export const RESET_CURR_LAYERS='RESET_CURR_LAYERS';
export const SET_HOVER_LAYER='SET_HOVER_LAYER';
export const SET_SPEC_LAYER='SET_SPEC_LAYER';

export const SET_CENTER = 'SET_CENTER';
export const SET_RADIUS = 'SET_RADIUS';

export const SAVED= 'SAVED';
//-------------------ACTION CREATORS - vanilla loading of information
export const getAllSites = (sites) => {
	return {
		type: GET_ALL_SITES,
		sites: sites
	};
};

export const getGenBiblio = (bib) => {
	return {
		type: GET_GEN_BIB,
		bib
	};
};

export const setMinorId = (objId, clusterId) => {
	return {
		type: SET_MINOR_ID,
		objId: [objId, clusterId],
	};
}

export const getFilteredSites = (sites) => {
	return{
		type: GET_FILTERED_SITES,
		sites
	};
};

export const getCurrSite = (site) => {
	return {
		type: GET_CURR_SITE,
		site: site
	};
};

export const getCurrSiteZoom = (bool) => {
	return {
		type: GET_CURR_SITEZOOM,
		bool
	};
};

export const getCurrDetail = (detailId) => {
	return {
		type: GET_CURR_DETAIL,
		detail: detailId
	};
};

export const getCurrNarr = (id) => {
	return {
		type: GET_CURR_NARR,
		id
	};
};

export const getGenDetails = (details) => {
	return {
		type: GET_GEN_DETAIL,
		details
	};
};

export const getGenNarratives = (narratives) => {
	return {
		type: GET_GEN_NARR,
		narratives
	};
};

export const getGenImages = (images) => {
	return {
		type: GET_GEN_IMG,
		images
	};
};

export const getCurrImgs = (images) => {
	return {
		type: GET_CURR_IMGS,
		imgs: images
	};
};

export const getAllLayers = () => {
	return {
		type: GET_ALL_LAYERS,
		layers: layersFullList,
	};
};

export const getCurrLayers = (layers) => {
	console.log('almost', layers);

	return {
		type: GET_CURR_LAYERS,
		layers: layers
	};
};

export const addCurrLayers = (layer) => {
	return {
		type: ADD_CURR_LAYERS,
		layer: layer
	};
};

export const resetCurrLayers = (layer) => {
	return {
		type: RESET_CURR_LAYERS,
		layer: layer
	};
};

export const addHoverLayer = (layer) => {
	return {
		type: SET_HOVER_LAYER,
		layer: layer
	};
};

export const setSpecLayer = (type) => {
	return {
		type: SET_SPEC_LAYER,
		layer: type
	};
};

export const addNewSiteGeo1 = (x, y, px, py) =>{
	return {
		type: SET_CENTER,
		coord: [x, y, px, py],
	}
}

export const addNewSiteGeo2 = (radius, rad2) =>{
	return {
		type: SET_RADIUS,
		rad: [radius, rad2],
	}
}

export const saved = (bool) => {
	return {
		type: SAVED,
		bool: bool,
	}
}
//-------------------reducers && initial info
const initSites = {
	allSites:[], //array of objects

	currSite: 0, //id of site
	currSiteOn: false, //secondary object arrays
	currDetail: 0, //main vs. peripheral detail for panel (id of site)
	currNarrative: {},
	genNarratives: [],
	genDetails: [], //narratives & captions
	genImages: [],
	genBiblio: [],
	currImages: {}, //links for panel images
	minorId: 0,
	clusterId: 0,

	allLayers: layersFullList.slice(), //arr of strings
	currLayers: layersFullList.slice(), //arr of strings
	hoverLayer: ' ',
	specLayer:'',

	newCx : 0,
	newX :0,
	newY: 0,
	newRad:0,
	newCy: 0,
	newRadius: 0,

	saved: false,

};

export const siteReducer = (prevState = initSites, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case GET_ALL_SITES:
		newState.allSites = action.sites;
		break;

	case SET_CENTER:
		newState.newCx = action.coord[0];
		newState.newCy = action.coord[1];
		newState.newX = action.coord[2];
		newState.newY = action.coord[3];
		break;

	case SET_RADIUS:
		newState.newRadius = action.rad[0];
		newState.newRad = action.rad[1];
		break;

	case GET_CURR_SITE:
		newState.currSite = action.site;
		break;

	case GET_CURR_SITEZOOM:
		newState.currSiteOn = action.bool;
		break;

	case GET_CURR_DETAIL:
		newState.currDetail = action.detail;
		break;

	case GET_CURR_NARR:
		newState.currNarrative = action.narrative;
		break;

	case GET_GEN_DETAIL:
		newState.genDetails = action.details;
		break;

	case GET_GEN_NARR:
		newState.genNarratives = action.narratives;
		break;

		case GET_GEN_BIB:
		newState.genBiblio = action.bib;
		break;

	case GET_GEN_IMG:
		newState.genImages = action.images;
		break;

	case GET_CURR_IMGS:
		newState.currImages = action.imgs;
		break;

	case SET_MINOR_ID:
		newState.minorId = action.objId[0];
		newState.clusterId = action.objId[1];
		break;

	case GET_ALL_LAYERS:
		newState.allLayers = action.layers;
		break;

	case GET_CURR_LAYERS:
		newState.currLayers = action.layers;
		break;

	case ADD_CURR_LAYERS:
		let add=action.layer.split(', ');
		let array = newState.currLayers.concat(add);
		newState.currLayers = array;
		break;

	case RESET_CURR_LAYERS:
		let arr = newState.currLayers;
		let layers = action.layer.split(', ');
		layers.forEach(layer=>{
			arr.splice(arr.indexOf(layer),1);
		})
		newState.currLayers = arr;
		break;

	case SET_HOVER_LAYER:
		newState.hoverLayer = action.layer;
		break;

	case SET_SPEC_LAYER:
		newState.specLayer = action.layer;
		break;

	case SAVED:
		newState.saved = action.bool;
		break;

	default:
		return prevState;
	}

	return newState;

};

//-------------------COMPLEX ACTION CALLS AND AXIOS INFO...

//------------------api version--------------------------

export const loadSites = () => dispatch => {
	//rework for axios later
	const allSites = axios.get('/api/sites')
			.then(responses => {
				return responses.data;
			})
	    .then((sites) => {
	    		dispatch(getAllSites(sites));
	    })
	    .catch(console.log);
}

export const loadFilteredSites = (layerArr) => dispatch => { //

	const allSites = axios.get('/api/sites')
			.then(responses => {
				return responses.data;
			})
	    .then((sites) => { //front-end filter vs. back

			 var selectSites = sites.filter(circle =>{
					return layerArr.indexOf(circle.type)>-1;
				})

				dispatch(getFilteredSites(selectSites));
			})
			.catch(console.log);
}

//------------------non-api version--------------------------

// export const loadSites = () => dispatch => {
// 	//rework for axios later
// 	    		dispatch(getAllSites(sites.slice()));

// }

// export const loadFilteredSites = (layerArr) => dispatch => { //

// 			 var selectSites = sites.filter(circle =>{
// 					return layerArr.indexOf(circle.type)>-1;
// 				})

// 				dispatch(getFilteredSites(selectSites));

// }

//------------------non-api end--------------------------

export const updateSite = (site)=> dispatch =>{
	dispatch(getCurrSite(site));
}

export const setSpecPanel = (type)=> dispatch =>{
	dispatch(setSpecLayer(type));
}

export const overlayDetails = (bool) => dispatch =>{
	dispatch(getCurrSiteZoom(bool));
}

export const loadFiltered = (layers) => dispatch => {
	//set this up grab all on initial mount, but then work with addSelect below to grab pieces at a time...

	dispatch(getCurrLayers(layers));
}

export const addHoverSite = (layer) => dispatch =>{
	dispatch(addHoverLayer(layer));
}

//------------------api version--------------------------

export const loadLayers = () => dispatch => { //loading all

		const allSites = axios.get('/api/sites')
			.then(responses => {
				return responses.data;
			})
	    .then((sites) => { //front-end filter vs. back

			let cirLayers = [];
			sites.forEach(circle=>{
		    		if (cirLayers.indexOf(circle.type) === -1){cirLayers.push(circle.type)};
				})
			dispatch(getAllLayers(cirLayers));
		})
	   .catch(console.log);
}


export const deleteSite = (id) => dispatch => {
	axios.delete(`/api/sites/${id}`)
			.then(responses => {
				return responses.data;
			})
			.then((results) => {
			console.log(results);
			dispatch(loadSites());
			})
			.catch(console.log);
}

// //------------------non-api version--------------------------

// export const loadLayers = () => dispatch => { //loading all

// 			let cirLayers = [];
// 			sites.forEach(circle=>{
// 		    		if (cirLayers.indexOf(circle.type) === -1){cirLayers.push(circle.type)};
// 				})
// 			dispatch(getAllLayers(cirLayers));
// }

// export const deleteSite = (id) => dispatch => {

// 		//not necessariy outside of editing
// }

//-----------detail editing dispatches------------------------
export const deleteDetail = (id) => dispatch => {
	axios.delete(`/api/details/${id}`)
			.then(responses => {
				return responses.data;
			})
			.then((results) => {
				console.log(results);
			dispatch(reloadDetails());
			})
			.catch(console.log);
}

export const editDetail = (id, obj) => dispatch => {
	axios.put(`/api/details/${id}`, obj)
			.then(responses => {
				return responses.data;
			})
			.then((results) => {
				console.log(results);
			dispatch(reloadDetails());
			})
			.catch(console.log);
}


export const reloadDetails = () => dispatch => {
	axios.get('/api/details')
			.then(responses => {
				return responses.data;
			})
			.then((results) => {
			dispatch(getGenDetails(results));
			})
			.catch(console.log);
}

export const addDetail = (img, obj) => dispatch => {

	axios.post('api/images-files', img)
			.then(responses => {
				return responses.data;
			})
			.then(results =>{

				obj.srcThumb = results.uri;
				console.log('image placed, link: ', obj);

			axios.post('/api/details', obj)
						.then(responses => {
							return responses.data;
						})
						.then((results) => {
						dispatch(reloadDetails()); //call and reload all
						dispatch(saved(true));
						})
						.catch(console.log);
			})
			.catch(console.log);
}

export const addImage = (img, obj) => dispatch => {
	console.log('image original file: ', img);

	axios.post('api/images-files', img)
			.then(responses => {
				return responses.data;
			})
			.then(results =>{

				obj.src = results.uri;
				console.log('image placed, link: ', obj);

			axios.post('/api/images', obj)
						.then(responses => {
							return responses.data;
						})
						.then((results) => {
							dispatch(reloadImages()); //call and reload all
							dispatch(saved(true));
						})
						.catch(console.log);
			})
			.catch(console.log);
}

export const reloadImages = () => dispatch => {
	axios.get('/api/images')
			.then(responses => {
				return responses.data;
			})
			.then((images) => {
			dispatch(getGenImages(images));
			})
			.catch(console.log);
}

export const deleteImages = (id) => dispatch => {
	axios.delete(`/api/images/${id}`)
			.then(responses => {
				return responses.data;
			})
			.then((results) => {
			dispatch(reloadImages());
			})
			.catch(console.log);
}

export const editImages = (id, obj) => dispatch => {
	axios.put(`/api/images/${id}`, obj)
			.then(responses => {
				return responses.data;
			})
			.then((results) => {
			dispatch(reloadImages());
			})
			.catch(console.log);
}

//-----------narrative & detail general dispatches------------------------

export const deleteNarrative = (id) => dispatch => {
	axios.delete(`/api/narratives/${id}`)
			.then(responses => {
				return responses.data;
			})
			.then((narratives) => {
				console.log(narratives);
			dispatch(reloadNarratives());
			})
			.catch(console.log);
}

export const deleteBiblio = (id) => dispatch => {
		axios.delete(`/api/biblio/${id}`)
			.then(responses => {
				return responses.data;
			})
			.then((bib) => {
				console.log(bib);
			dispatch(reloadBiblio());
			})
			.catch(console.log);
}


export const editBiblio = (id, obj) => dispatch => {
		axios.put(`/api/biblio/${id}`, obj)
			.then(responses => {
				return responses.data;
			})
			.then((bib) => {
				console.log(bib);
			dispatch(reloadBiblio());
			})
			.catch(console.log);
}

export const reloadNarratives = () => dispatch => {
	axios.get('/api/narratives')
			.then(responses => {
				return responses.data;
			})
			.then((narratives) => {
			dispatch(getGenNarratives(narratives));
			})
			.catch(console.log);
}

export const reloadBiblio = () => dispatch => {
		axios.get('/api/biblio')
			.then(responses => {
				return responses.data;
			})
			.then((bib) => {
			dispatch(getGenBiblio(bib));
			})
			.catch(console.log);
}

export const getDetailsNarratives = () => dispatch =>{

	const allDetails = axios.get('/api/details')
			.then(responses => {
				return responses.data;
			})

	const allNarratives = axios.get('/api/narratives')
			.then(responses => {
				return responses.data;
			})

	const allImages = axios.get('/api/images')
			.then(responses => {
				return responses.data;
			})

	const allBiblio = axios.get('/api/biblio')
			.then(responses => {
				return responses.data;
			})

	Promise.all([allDetails, allNarratives, allImages, allBiblio])
		.then((results) => {
			const details = results[0], narratives = results[1], images=results[2], biblio = results[3];
			dispatch(getGenDetails(details));
			dispatch(getGenNarratives(narratives));
			dispatch(getGenImages(images));
			dispatch(getGenBiblio(biblio));
		})
		.catch(console.log);
}

export const addBiblio = (biblioObj) => dispatch => {
		console.log('pre-post', biblioObj);

	axios.post('/api/biblio', biblioObj)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(reloadBiblio());
	    dispatch(saved(true));
			})
	   .catch(console.log);
}

export const addSelectLayer = (layer) => dispatch => { //add and load
	dispatch(addCurrLayers(layer));
}

export const setDetailId = (objId, clusterId) => dispatch => {
	dispatch(setMinorId(objId, clusterId));
}

export const deleteSelectLayer = (layer) => dispatch => { //add and load
	dispatch(resetCurrLayers(layer));
}

//HARD CODING UNTIL WE ACTUALLY HAVE ALL THE LAYERS SET
export const addAllLayers = (layers) => dispatch => { //load all/clear all to select

	console.log('add or clear', layers, layersFullList);

	if (layers==='add'){
			dispatch(getCurrLayers(layersFullList.slice()));
	} else {
		dispatch(getCurrLayers([]));
	};
}

//-----------Site editing dispatches------------------------

export const addNewSite = (siteObj) => dispatch => {
	console.log('pre-post', siteObj);

	axios.post('/api/sites', siteObj)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(loadSites());
	    dispatch(saved(true));
			})
	   .catch(console.log);
}

export const editSite = (id, siteObj) => dispatch => {
	console.log('pre-put', siteObj);

	axios.put(`/api/sites/${id}`, siteObj)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(loadSites());
			dispatch(getCurrSite(id));
			})
	   .catch(console.log);
}

export const addNewSiteCenter = (cx, cy, pastX, pastY) => dispatch => {
	dispatch(addNewSiteGeo1(cx, cy, pastX, pastY));
}

export const addNewSiteRadius = (radius, radPast) => dispatch => {
	dispatch(addNewSiteGeo2(radius, radPast));
}

//-----------saved? dispatches------------------------

export const resetSaved = () => dispatch => {
	dispatch(saved(false));
}

//-----------Narrative dispatches------------------------

export const addNarrative = (narrObj) => dispatch => {

	console.log('pre-post narr', narrObj);

	axios.post('/api/narratives', narrObj)
			.then(responses => {
				return responses.data;
			})
	    .then((narrative) => {
	    dispatch(reloadNarratives());
	    dispatch(saved(true));
			})
	   .catch(console.log);

}

export const editNarrative = (id, siteObj) => dispatch => {
	console.log('pre-put', siteObj);

	axios.put(`/api/narratives/${id}`, siteObj)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(reloadNarratives());
			})
	   .catch(console.log);
}

//-----------Bibliography dispatches------------------------

export const addBibliography = (biblioObj) => dispatch => {
		console.log('pre-post', biblioObj);

	axios.post('/api/biblio', biblioObj)
			.then(responses => {
				return responses.data;
			})
	    .then((site) => {
	    dispatch(reloadBiblio());
	    dispatch(saved(true));
			})
	   .catch(console.log);
}
