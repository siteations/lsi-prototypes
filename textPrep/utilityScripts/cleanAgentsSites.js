//basic node script to log/sort place, pname, other tags

const fs = require('fs');

//const chapters = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];
const chapters = ['07'];

const uni = [ '&#x2014;',
  '&#x00E9;',
  '&#x00E0;',
  '&#x2013;',
  '&#x00E1;',
  '&#x00B0;',
  '&#x00E8;',
  '&#x00F4;',
  '&#x2026;',
  '&#x00C9;',
  '&#x00E7;',
  '&#x00F6;',
  '&#x00BD;',
  '&#x00ED;',
  '&#x2032;',
  '&#x2033;',
  '&#x00D7;',
  '&#x00F3;',
  '&#x00EB;',
  '&#x00FC;',
  '&#x00E2;',
  '&#x00CE;',
  '&#x00D4;',
  '&#x00EA;',
  '&#x00EE;',
  '&#x00EF;',
  '&#x00E4;',
  '&#x00E3;',
  '&#x00C1;',
  '&#x00FA;',
  '&#x014D;',
  '&#x016B;',
  '&#x00EC;',
  '&#x00F2;' ];

const unicode = [];

chapters.forEach(item=>{

	var contents = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents_sites.xml`, 'utf8');


	//---------------------general synch----------------------//

	const countAll={
		pages: contents.split('<pb n="').length-1,
		place: contents.split('<name type="place">').length-1,
		pnoun: contents.split('<name type="pname">').length-1,
		notes: contents.split('<note xml:id="').length-1,
		biblio: contents.split('<bibl>').length-1,
		figures: contents.split('<figure xml:id').length-1,
		};

	//add a second object for the index and glossary

	const matchAll={
		pages: contents.match(/<pb n=\".*\/>/g),
		place: contents.match(/<name type="place">(.+?)<\/name>/g),
		pname: contents.match(/<name type="pname">(.+?)<\/name>/g),
		notes: contents.match(/<note xml:id="\S*" place="end">((.|\n|\r)+?)<\/note>/g),
		biblio: contents.match(/<bibl>((.|\n|\r)+?)<\/bibl>/g),
		figures: contents.match(/<figure xml:id="\S*">((.|\n|\r)+?)<\/figure>/g),
		unicode: contents.match(/\&#x\S+?;/g),
		divisions: contents.match(/<div type="\S*">/g)
		};

	matchAll.unicode.forEach(code=>{
		var cleaned = code //.replace('&#x', '').replace(';','');

		if (unicode.indexOf(cleaned) === -1){
			unicode.push(cleaned);
		}
	})


	console.log(item, countAll, unicode);

//})

	// var chapters = contents.split('<div type="chapter">').map(each=>'<div type="chapter">' + each)
	// 		chapters.forEach((chapter, i)=> fs.writeFileSync('../Landscape Design/chapters/'+(i-1).toLocaleString(undefined, { minimumIntegerDigits: 3 })+ '.xml', chapter));

//---------------------------- agents basics (run me first) -----------------------------------


	// var agentsInd = [];
	// var agentsArr=[];
	// var agents = contents.match(/<name type="pname"((.|\n|\r)+?)<\/name>/g)
	// 	.forEach(match=>{
	// 		var agent = match.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
	// 		if (agentsInd.indexOf(agent)===-1){
	// 			agentsInd.push(agent)
	// 			agentsArr.push({name:[agent], id:0, chp:item })
	// 		}
	// });

	// console.log(agentsArr, agentsInd.length)

	// fs.writeFileSync(`../Lists/${item}agents.js`, 'var agents='+JSON.stringify(agentsArr)+'; module.exports.agents = agents');



//---------------------------- site basics (run me after all agent processing is done) -----------------------------------

/*

	var sitesInd = [];
	var sitesArr=[];
	var site = contents.match(/<name type="place" subtype=((.|\n|\r)+?)<\/name>/g)
		.forEach(elem=>{
			var site = elem.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
			var siteType = (elem.match(/subtype="\w+?"/g))? elem.match(/subtype="\w+?"/g)[0].replace(/subtype="/g, '').replace(/"/g, '') : null ;
			if (sitesInd.indexOf(site)===-1){
				sitesInd.push(site)
				sitesArr.push({name:[site], id:0, chp:item, type: siteType })
			}
	});

	console.log(sitesArr, sitesInd.length)

	var placeInd = [];
	var placeArr=[];
	var place = contents.match(/<name type="place"((.|\n|\r)+?)<\/name>/g)
		.forEach(elem=>{
			var site = elem.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
			var siteType = (elem.match(/subtype="\w+?"/g))? elem.match(/subtype="\w+?"/g)[0].replace(/subtype="/g, '').replace(/"/g, '') : null ;
			if (placeInd.indexOf(site)===-1 && siteType=== null){
				placeInd.push(site)
				placeArr.push({name:[site], id:0, chp:item, type: siteType })
			}
	});

	//console.log(placeArr, placeInd.length)
	fs.writeFileSync(`../Lists/${item}sites.js`, 'var sites='+JSON.stringify(sitesArr)+'; module.exports = sites');
	//fs.writeFileSync(`../Lists/${item}place.js`, 'var place='+JSON.stringify(placeArr)+'; module.exports = place');


})

*/

//------------ resource basics (run me after all agent and site processing is done) ----------------------

/*

	var resInd = [];
	var resArr=[];
	var res = contents.match(/<hi rend="italic">((.|\n|\r)+?)<\/hi>/g) //this will grab titles and figures
		.forEach(elem=>{
			var site = elem.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');

			if (resInd.indexOf(site)===-1){
				resInd.push(site)
				resArr.push({name:[site], id:0, chp:item, type: null })
			}
	});

	console.log(resArr, resInd.length)

	fs.writeFileSync(`../Lists/${item}resources.js`, 'var resources='+JSON.stringify(resArr)+'; module.exports = resources');

*/
})

// const resources = require(`../Lists/07resources.js`);
// const agJS = resources.sort((a,b)=>{
// 	if (a.name[0] < b.name[0]) {
//     return -1;
//   }
//   if (a.name[0] > b.name[0]) {
//     return 1;
//   }
//   // names must be equal
//   return 0;
// }).map((ag,i)=>{ag.count=0; ag.id=7000+i; return ag});

// console.log(agJS);
// fs.writeFileSync(`../Lists/07resources_.js`, 'var resources='+JSON.stringify(agJS)+'; module.exports = resources');

//-------------revise agents and check matching (2 rounds), secondary text read through-------------------

/*
TIMING NOTE:
First round, basic checks for names: 2pm-4:52pm, 4:52-5:37pm for secondary checks (~4 hrs)
in advance of computational count

grab addition agents and place additions during read through...
second round additions of name/placement correction in oxygen: 12:23pm-1:33pm, 3:36-3:54PM, 6:30-7:12pm, plus an hour min. 8:40pm-9pm, 1-2:50pm (1+1.5+.75+.25+2 = 5.5-6 hr with footnotes)
addition of notes:



const {agents} = require(`../Lists/09agents_.js`);
const agJS = agents.map((ag,i)=>{ag.count=0; ag.id=9000+i; return ag});

var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09B.xml`, 'utf8');
var chpCount = chpRev.match(/<name type="pname"((.|\n|\r)+?)<\/name>/g).length
var omitted =[]
var chpAgents = chpRev.match(/<name type="pname"((.|\n|\r)+?)<\/name>/g)
											.forEach(match=>{
														var agent = match.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
														var agentType = (match.match(/subtype="\w+?"/g))? match.match(/subtype="\w+?"/g)[0].replace(/subtype="/g, '').replace(/"/g, '') : null ;
														var currCount = chpCount;
														agJS.forEach(ag=>{
														if (ag.name.indexOf(agent)!==-1){
															ag.count ++ ;
															ag.type = agentType ;
															delete ag.subtype;
															chpCount -- ;
														}
														})
														if (currCount === chpCount){
															omitted.push(agent);
															var entry = {name: [agent],"id": 9000+agJS.length, "chp": "09", "count": 1, "type": null};
															agJS.push(entry);

														};
												});
	const ag = agJS.filter(each=>each.count===0);
	// omitted.forEach((agent, i)=>{
	// 	var entry = {name: [agent],"id": 9000+agJS.length, "chp": "09", "count": 1, "type": null};
	// 	agJS.push(entry);
	// })

console.log('agents found', ag);
console.log('agents omitted', omitted);
console.log('agents results', agJS.length);
//console.log('agents list', agJS);

// HOW TO USE LOGS: use omitted and ag found, to update and correct the agents list, focus tagging of individuals

//fs.writeFileSync(`../Lists/09agentsE.js`, 'var agents='+JSON.stringify(agJS)+'; module.exports.agents = agents');

*/

//})

//-------------------author tag additional names---------------------------------------------------------



// use this once you've gotten to 0,0 above form agents found and agents omitted in the first round of tagging
// we're checking for additional, untagged instances for each name - agJS and chpRev

//start from agJs.... 'a b', 'b' or 'a b' loop through whole text to find untagged 'a b' instances or 'b' instances and tag them
/*

//long name to variant last name
const nameVar = (name)=>{
	if (name[0].includes(' de ')){
		var res = 'de'+name[0].split(' de')[1];
		name.push(res);
	} else if (name[0].includes("L\'")){
		var res = "L\'"+name[0].split("L\'")[1];
		name.push(res);
	} else if (name[0].includes("O\'")){
		var res = "O\'"+name[0].split("O\'")[1];
		name.push(res);
	}else {
		var res = name[0].split(' ')[name[0].split(' ').length-1];
		name.push(res);
	}
	return name;
}

//run thru full text and check for non-tagged
const tagCheck = (nameItem, chp)=>{
	var chpAdj;
	if (nameItem.trim() !== ''){

	var nTag = new RegExp(' '+nameItem+' ', 'g'), nw = ' <name type="pname">'+nameItem+'<\/name> ';
	var sTag = new RegExp(' '+nameItem+"'s ", 'g'), sw = ' <name type="pname">'+nameItem+'<\/name>'+"'s ";
	var pTag = new RegExp(' '+nameItem+". ", 'g'), pw = ' <name type="pname">'+nameItem+'<\/name>'+". ";
	//var test = chpRev.match(nTag);//.concat(chpRev.match(sTag), chpRev.match(pTag));
	//console.log(test);
	chpAdj =chp.replace(nTag, nw).replace(sTag, sw).replace(pTag, pw);
	} else {
		chpAdj = chp;
	}
	return chpAdj;
}


var agEx = agJS.map(agent=>{
		var names = agent.name;
		(agent.name.length===1 && agent.name[0].split(' ').length!=1)? names = nameVar(names) : null ;
		agent.name = names;
		names.forEach(name=>{
			chpRev = tagCheck(name,chpRev);
		})
		console.log(chpRev);
		return agent;

})

fs.writeFileSync(`../Lists/09agentsB.js`, 'var agents='+JSON.stringify(agEx)+'; module.exports.agents = agents');
fs.writeFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09b.xml`, chpRev);

*/

//})

//-------------revise sites and check matching (2 rounds), secondary text read through-------------------

/*

const sites = require(`../Lists/07sites.js`);
const agJS = sites.map((ag,i)=>{ag.count=0; ag.id=7000+i; return ag});

var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents.xml`, 'utf8');
var chpCount = chpRev.match(/<name type="place" subtype=((.|\n|\r)+?)<\/name>/g).length
var omitted =[]
var chpAgents = chpRev.match(/<name type="place" subtype=((.|\n|\r)+?)<\/name>/g)
											.forEach(match=>{
														var agent = match.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
														var agentType = (match.match(/subtype="\w+?"/g))? match.match(/subtype="\w+?"/g)[0].replace(/subtype="/g, '').replace(/"/g, '') : null ;
														var currCount = chpCount;
														agJS.forEach(ag=>{
														if (ag.name.indexOf(agent)!==-1){
															ag.count ++ ;
															ag.type = agentType ;
															delete ag.subtype;
															chpCount -- ;
														}
														})
														if (currCount === chpCount){omitted.push(agent)};
												});
	const ag = agJS.filter(each=>each.count===0);

console.log('agents found', ag);

fs.writeFileSync(`../Lists/07sitesA.js`, 'var sites='+JSON.stringify(agJS)+'; module.exports = sites');

*/

//-------------check against existing agents lists-------------------

// Match to existing list and add keys


// const agents07 = require(`../Lists/07agentsA_ulan.js`);
// console.log(typeof(agents07));
// //const agents09 = require(`../Lists/09agents_preComp.js`).agents;
// const agents09 = require(`../Lists/09agents_postComp.js`).agents;
// var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09b.xml`, 'utf8');

//-------- to compare overlaps----------
/*
const add07 = ((entry09)=>{
	agents07.forEach(entry=>{
		var res = entry.name.filter(name=>{
			//console.log(entry09.name, name, entry09.name.includes(name));
			return entry09.name.includes(name);
		}).length;
		if (res > 0) {
			var agentsAll = entry09.name.concat(entry.name)
			entry09.nameAlt = [...new Set(agentsAll)];
			entry09.idAlt = entry.id;
			entry09.ulan = entry.ulan;
			console.log(entry, entry09);
		}
	})
})

agents09.map(items=>{
	add07(items);
})

fs.writeFileSync(`../Lists/09agents_postComp.js`, 'var agents='+JSON.stringify(agents09)+'; module.exports.agents = agents');

*/


//-------- to edit replacement----------

/*

const replaceAdd = ((match)=>{
	var agent = match.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
	var rev = match;
	agents09.forEach(names=>{
		if (names.name.includes(agent)){
			rev = match.replace('type="pname"', 'type="pname" key="'+names.id+'"')
		}
	})
	//console.log(agent, match);
	return rev;
})

var chpCount = chpRev.match(/<name type="pname"((.|\n|\r)+?)<\/name>/g).length;
var chpAgents = chpRev.replace(/<name type="pname"((.|\n|\r)+?)<\/name>/g, replaceAdd);


console.log('agents found', chpAgents);

fs.writeFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09_agents.xml`, chpAgents);

*/
//-------------check against existing sites lists-------------------

// Match to existing list and add keys

/*

const agents07 = require(`../Lists/07sitesA_tng.js`);
console.log(typeof(agents07));

const agents09 = require(`../Lists/09sites_postComp.js`);
var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09b.xml`, 'utf8');

//-------- to compare overlaps----------

const add07 = ((entry09)=>{
	agents07.forEach(entry=>{
		var res = entry.name.filter(name=>{
			//console.log(entry09.name, name, entry09.name.includes(name));
			return entry09.name.includes(name);
		}).length;
		if (res > 0) {
			var agentsAll = entry09.name.concat(entry.name)
			entry09.nameAlt = [...new Set(agentsAll)];
			entry09.idAlt = entry.id;
			entry09.tng = entry.tng;
			entry09.g_address = entry.g_address;
			entry09.g_latitude = entry.g_latitude;
			entry09.g_longitude = entry.g_longitude;
			entry09.g_id = entry.g_id;
			console.log(entry, entry09);
		}
	})
})

agents09.map(items=>{
	add07(items);
})

// agents09.forEach((sites, i)=>{
// 	if (sites.id === 0){
// 		sites.id = i+9000
// 	}
// })

//fs.writeFileSync(`../Lists/09sites_preGoogleTng.js`, 'var agents='+JSON.stringify(agents09)+'; module.exports = agents');

*/





//-------------check against existing resource lists-------------------

// Match to existing list and add keys

/*

const resources07 = require(`../Lists/07resources_.js`);
console.log(typeof(resources07));
//const agents09 = require(`../Lists/09agents_preComp.js`).agents;
const resources09 = require(`../Lists/09resources.js`);
//var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09b.xml`, 'utf8');

//-------- to compare overlaps----------

const add07 = ((entry09)=>{
	resources07.forEach(entry=>{
		var res = entry.name.filter(name=>{
			//console.log(entry09.name, name, entry09.name.includes(name));
			return entry09.name.includes(name);
		}).length;
		if (res > 0) {
			var agentsAll = entry09.name.concat(entry.name)
			entry09.nameAlt = [...new Set(agentsAll)];
			entry09.idAlt = entry.id;
			//entry09.id = +entry09.id + 2000;
			//entry09.ulan = entry.ulan;
			console.log(entry, entry09);
		}
	})
})

resources09.map(items=>{
	add07(items);
})

fs.writeFileSync(`../Lists/09resources_postComp.js`, 'var agents='+JSON.stringify(resources09)+'; module.exports.agents = agents');

*/


//-------------revise agents and add to html-------------------

// Match to existing list and add keys

/*

const agents = require(`../Lists/09agents_postComp.js`).agents;
var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09b.xml`, 'utf8');

const replaceAdd = ((match)=>{
	var agent = match.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
	var rev = match;
	agents.forEach(names=>{
		if (names.name.includes(agent)){
			rev = match.replace('type="pname"', 'type="pname" key="'+names.id+'"')
		}
	})
	//console.log(agent, match);
	return rev;
})

var chpCount = chpRev.match(/<name type="pname"((.|\n|\r)+?)<\/name>/g).length;
var chpAgents = chpRev.replace(/<name type="pname"((.|\n|\r)+?)<\/name>/g, replaceAdd);


console.log('agents found', chpAgents);

fs.writeFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09_agents.xml`, chpAgents);

*/

//-------------revise resources and add to html-------------------

// Match to existing list and add keys

/*

const agents = require(`../Lists/07resources_.js`);
var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents_sites.xml`, 'utf8');

const replaceAdd = ((match)=>{
	var agent = match.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
	var rev = match;
	agents.forEach(names=>{
		if (names.name.includes(agent)){
			rev = match.replace('rend="italic"', 'rend="italic" key="'+names.id+'"')
		}
	})
	//console.log(agent, match);
	return rev;
})

var chpCount = chpRev.match(/<hi rend="italic">((.|\n|\r)+?)<\/hi>/g).length;
var chpAgents = chpRev.replace(/<hi rend="italic">((.|\n|\r)+?)<\/hi>/g, replaceAdd);


console.log('agents found', chpAgents);

fs.writeFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents_sites_resources.xml`, chpAgents);

*/


//-------------revise sites and add to html-------------------

// Match to existing list and add keys


const sites = require(`../Lists/09sites_preGoogleTng.js`);
var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09_agents_resources.xml`, 'utf8');

const replaceAdd = ((match)=>{
	var agent = match.match(/>((.|\n|\r)+?)</g)[0].replace(/>|<|\n|\r/g, '').replace(/(\s{1,})/g,' ');
	var type = match.match(/subtype="(.|\n|\r)+?"/g)[0].replace(/subtype="/g, '').replace(/"/g, '');
	var rev = match;
	sites.forEach(names=>{
		if (names.name.includes(agent) && names.type === type){
			rev = match.replace('type="place"', 'type="place" key="'+names.id+'"')
		}
	})
	console.log(agent, rev, type);
	return rev;
})

var chpCount = chpRev.match(/<name type="place"((.|\n|\r)+?)<\/name>/g).length;
var chpAgents = chpRev.replace(/<name type="place" subtype="((.|\n|\r)+?)<\/name>/g, replaceAdd);


console.log('agents found', chpAgents);

fs.writeFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/09_agents_sites_resources.xml`, chpAgents);

