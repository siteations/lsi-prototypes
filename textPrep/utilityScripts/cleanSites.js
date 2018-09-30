// see variants in cleanResource, cleanAgents ....

//----------------------------------------------- overall count, misc residual codes ----------------------------------


//basic node script to log/sort place, pname, other tags

const fs = require('fs');

//const chapters = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];
const chapters = ['07'], chap = '07';

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
var contents;

chapters.forEach(item=>{

	contents = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents_sites_resources.xml`, 'utf8');


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

})

	// var chapters = contents.split('<div type="chapter">').map(each=>'<div type="chapter">' + each)
	// 		chapters.forEach((chapter, i)=> fs.writeFileSync('../Landscape Design/chapters/'+(i-1).toLocaleString(undefined, { minimumIntegerDigits: 3 })+ '.xml', chapter));

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
	fs.writeFileSync(`../Lists/${chap}sites.js`, 'var sites='+JSON.stringify(sitesArr)+'; module.exports = sites');
	//fs.writeFileSync(`../Lists/${chap}place.js`, 'var place='+JSON.stringify(placeArr)+'; module.exports = place');


*/


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

//-------------revise sites and add to html-------------------

// Match to existing list and add keys


const sites = require(`../Lists/07sites_tng.js`);
var chpRev = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents_sites_resources.xml`, 'utf8');

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

fs.writeFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents_sites_resources-.xml`, chpAgents);

