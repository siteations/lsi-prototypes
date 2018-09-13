// see variants in cleanResource, cleanSites ....

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

	contents = fs.readFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/07_agents_sites.xml`, 'utf8');


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

	// fs.writeFileSync(`../Lists/${chap}agents.js`, 'var agents='+JSON.stringify(agentsArr)+'; module.exports = agents');


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

//fs.writeFileSync(`../Lists/${chap}agents_.js`, 'var agents='+JSON.stringify(agJS)+'; module.exports = agents');

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

fs.writeFileSync(`../Lists/${chap}agents_B.js`, 'var agents='+JSON.stringify(agEx)+'; module.exports.agents = agents');
fs.writeFileSync(`../svn Landscape Design/repos/xml/BetsyRogers/chapters/${chap}b.xml`, chpRev);

*/

//})

//-------------check agents list for chapter against existing agents lists-------------------

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

fs.writeFileSync(`../Lists/09agents_postComp.js`, 'var agents='+JSON.stringify(agents09)+'; module.exports = agents');

// this will require a manual check and confirmation of  matching identity... run for as many chapters as required... or work from a composite agent list.
*/


//-------- to edit replacements in xml----------

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

