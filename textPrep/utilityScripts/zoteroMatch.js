
const fs = require('fs');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");

const resources = require('../Lists/07resources_preZotero.js');
//second round only
const matches = require('../Lists/07resourcesMatches.js');
const agents = require('../Lists/07agents_ulan.js');


//-------------------for api search and retrieval-------------------

/*
//const key = //'4XchKcJeLMhVHlRj2J80nzAm' ;
const key ='2ZGzN5K0rrQRZ3mk5Z0xrjB9';
const group = 'http://api.zotero.org/groups/2144277/items/top'

var calls=[]

resources.forEach(item=>{

	var params = {params:{
			format: 'json',
			include: 'data',
			v: '3',
			start: '0',
			q: item.name[0],
			//qmode:'everything',// only use in first round
			//tag: '',
			//itemType: 'book',
			'api_key': key
		}
	}

	calls.push(axios.get(group,params));

})

Promise.all(calls)
	.then(result=>{
		//resS= res[0];
		result = result.map(res=>{
			return {
				title: res.config.params.q,
				data:res.data[0]? res.data[0].data : null,
			}
		});

		//save out list of volumes with null result for updating and repeat check after additions
		var matches = result.filter(item=> item.data!==null);
		var missing = result.filter(item=> item.data===null);
		console.log(missing.length, matches.length);

		fs.writeFileSync('../Lists/07resourcesMissing1.js', 'var resources='+JSON.stringify(missing)+';\r module.exports=resources');
		fs.writeFileSync('../Lists/07resourcesMatches1.js', 'var resources='+JSON.stringify(matches)+';\r module.exports=resources');


	})
	.catch(err=>console.log(err));

*/

//-------------- match retrieved and tagged. association started -----------------------

//A. mutual id: flip thru list, grab matching zotero key, zotero url, add id to zotero find
//B. from zotero matches, start association list - resource - created by - agent
/* "created by - role": "2325"
	with potentials for publisher "publisher was - firm": "2650", manual check
*/

const res2 = resources.map(resource=>{ // A. create basic working list...

	var res = matches.filter(match=>{
	 return match.title === resource.name[0]
	});
	//console.log(res);

	if (res.length>0) {
		resource.zoteroId = res[0].data.key;
		resource.zoteroUrl = res[0].data.url;
		resource.creator = res[0].data.creators[0]? res[0].data.creators[0] : null ;
		//resource.publisher = res[0].data.publisher; later
	}

	return resource;

})

const matchAuth = (name=>{ // name sorting
	if (name){
	var entry = agents.filter(agent=>{
	 return agent.name.includes(`${name.firstName} ${name.lastName}`)
	}).map(item=>{
		return {
			name: item.name,
			id: item.id,
		}
	});
		return entry[0];
	} else {
		return null;
	}
})

const resAssoc = res2.map(resource=>{ //B. basic author associations...
	const aEnt = {
		"aName": resource.name,
		"aId": resource.id,
		"aType": "resource",
		"relName": "created by - role",
		"relId": 2325,
		"rel": "author",
		"bName": matchAuth(resource.creator)? matchAuth(resource.creator).name : null ,//manual checks
		"bId": matchAuth(resource.creator)? matchAuth(resource.creator).id : null , //manual checks
		"bType": "agent",
		"checks": resource.creator //manual checks
	};
	return aEnt;
});

const clres = res2.map(resource=>{
	delete resource.creator
	return resource;
})

fs.writeFileSync('../Lists/07association.js', 'var assoc='+JSON.stringify(resAssoc)+';\r module.exports=assoc');

fs.writeFileSync('../Lists/07resources_postZotero.js', 'var resources='+JSON.stringify(clres)+';\r module.exports=resources');


