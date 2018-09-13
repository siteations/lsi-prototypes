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

	contents = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents.xml`, 'utf8');


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
