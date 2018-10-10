import agents1 from '../data/07agents_ulan.js';
import agents2 from '../data/09agents_ulan.js';

import net1 from '../data/07association.js';
import net2 from '../data/09association.js';

import hexConv from './hexConversion.js';



const agents = agents1.concat(agents2);
const network = net1.concat(net2);


export const SET_AGENT_ID = 'SET_AGENT_ID'
export const SET_AGENT_NAME = 'SET_AGENT_NAME';
export const SET_AGENT_OBJ = 'SET_AGENT_OBJ';

export const SET_AGENT_ALL= 'SET_AGENT_ALL';

export const SET_ASSOC_ALL= 'SET_ASSOC_ALL';
export const SET_ASSOC_AGENT= 'SET_ASSOC_AGENT';


export const setAgentId = (agentId) => {
	return {
		type: SET_AGENT_ID,
		agentId
	};
};

export const setAllAgents = (allAgents) => {
	return {
		type: SET_AGENT_ALL,
		allAgents
	};
};

export const setAllAssoc = (allAssoc) => {
	return {
		type: SET_ASSOC_ALL,
		allAssoc
	};
};

export const setAgentAssoc = (agentAssoc) => {
	return {
		type: SET_ASSOC_AGENT,
		agentAssoc
	};
};

export const setAgentName = (agentName) => {
	return {
		type: SET_AGENT_NAME,
		agentName
	};
};

export const setAgentObj= (agentObj) => {
	return {
		type: SET_AGENT_OBJ,
		agentObj
	};
};

const initMap = {

	agentId: 7000,
	agentName: 'Ermenonville',
	agentObj: {
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
	allAgents: {},

	allAssoc: {},
	agentAssoc: {},

};


export const agentReducer = (prevState = initMap, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case SET_AGENT_ID:
		newState.agentId = action.agentId;
		break;

	case SET_AGENT_NAME:
		newState.agentName = action.agentName;
		break;

	case SET_AGENT_OBJ:
		newState.agentObj = action.agentObj;
		break;

	case SET_AGENT_ALL:
		newState.allAgents = action.allAgents;
		break;

	case SET_ASSOC_ALL:
		newState.allAssoc = action.allAssoc;
		break;

	case SET_ASSOC_AGENT:
		newState.agentAssoc = action.agentAssoc;
		break;

	default:
		return prevState;
	}

	return newState;

};

export const setAgentData = (id, name) => dispatch => {
  dispatch(setAgentId(id));
  (!name)? name = agents.filter(site=> +site.id===+id)[0].name[0] : null;
  dispatch(setAgentName(name));
  var obj = agents.filter(site=> +site.id===+id)[0]
  dispatch(setAgentObj(obj));

  var lists =listQuery(network, id, 'agent', 2);
  //console.log(list);
  dispatch(setAgentAssoc(listConversion(lists)));

  //add network here - look at data structure - more generally

};

export const loadAgents = () => dispatch => {
	var agentObjs={}
	agents.forEach(item=>{
		agentObjs[item.id] = item;
	})
	//console.log(siteObjs);
  dispatch(setAllAgents(agentObjs));
  //update based on d3 data-type
  dispatch(setAllAssoc(listConversion(network)));
};


/* reference:
{
    "aName": ["A Dialogue upon the Gardens of the Right Honourable the Lord Viscount Cobham, at Stow in Buckinghamshire"],
    "aId": 7001,
    "aType": "resource",
    "relName": "created by - role",
    "relId": 2325,
    "rel" : "author",
    "bName": ["William Gilpin", "Gilpin", "William Sawrey Gilpin", "Mr. Gilpin"],
    "bId": 7082,
    "bType": "agent"
}

*/

const listConversion = (list) => {
	var nodes=[]; //add individual entities: name and type - rework for id's later
	var links=[]; //clean: source, target, rel

	list.forEach(assoc=>{
		if (assoc.aName && assoc.aType && assoc.bName && assoc.bType){
			var a = {name:hexConv(assoc.aName[0]), type: assoc.aType, id: assoc.aId};
			var aArr = nodes.filter(item => (item.name === hexConv(assoc.aName[0])));
			var b = {name:hexConv(assoc.bName[0]), type: assoc.bType, id: assoc.bId};
			var bArr = nodes.filter(item => (item.name === hexConv(assoc.bName[0])));
			var c = {source:hexConv(assoc.aName[0]), target:hexConv(assoc.bName[0]), rel: assoc.rel};
			(aArr.length===0)? nodes.push(a): null;
			(bArr.length===0)? nodes.push(b): null;
			(links.indexOf(c)===-1)? links.push(c): null;
		}
	});

	var data = {
		nodes: nodes,
		links: links
	}

	return data;

}

const listQuery = (list, id, type, degree) => {
	degree = degree || 2;
	var lastDegList = [{ aId: id, bId: null, aType: type, bType:null }];
	var array = [];
	var degInt = 0;
	var check = [];

	//id and type of a and b from resultant list - so for each entry, run twice.... concat all arr and get set
	while (degInt<degree){

		lastDegList.forEach((item)=>{
			var idA = item.aId, idB =item.bId;
			var typeA = item.aType, typeB = item.bType;
			//first each item
			var incList = list.filter(assoc =>{
				return (+assoc.aId === +idA && assoc.aType === typeA) || (+assoc.bId === +idA && assoc.bType === typeA) || (+assoc.aId === +idB && assoc.aType === typeB) || (+assoc.bId === +idB && assoc.bType === typeB)
				});
			check.push(...incList);
			array.push(...incList); //add to overall array
			})

			lastDegList = check.slice(); //update the matches
			check =[];
			degInt++;
			//console.log('network ', check, lastDegList, array, degInt);
	}

	return lastDegList;
}
