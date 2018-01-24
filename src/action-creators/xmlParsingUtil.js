import axios from 'axios';
import Promise from 'bluebird';

import hexConversion from './hexConversion.js';


//-----------basic regex functions---------------

const startPage = (para)=>{
	var page = para.match(/<pb n="\d*"/) ? para.match(/<pb n="\d*"/)[0].match(/\d+/g)[0] : null;
	return page;
}

const scrub = (text)=>{
	return text.replace(/<h5.+?>|<\/h5>|<head>|<date.+?>|<\/date>|<hi rend=".+?">|<\/hi>|<\/head>|<name type="place">|<name type="pname">|<name type="place" key=".+?>|<name type="pname" key=".+?>|<\/name>/g, '')
}

const paraNotes = (para)=>{
	var notes = para.match(/<ref target=.+?<\/ref>/g) ? para.match(/<ref target=.+?<\/ref>/g).map(ref=> {return {id:ref.match(/"#CH.+?"/g)[0].replace(/"/g, ''), value:ref.match(/-n.+?"/g)[0].replace(/"|-n/g, '')} }) : null;
	return notes;
}

const paraTitle = (header, i)=>{
	var pre, title, subtitle;
	var words = header.replace(/<head>|<hi rend="bold">|<\/hi>|<\/head>|<name type="place">|<name type="pname">|<\/name>/g, '').split(' '); // inner contents as array

	if (i !== 0){
		pre = words[0]+' '+words[1];
		title = words.slice(2).join(' ').split(':')[0];
		subtitle = words.slice(2).join(' ').split(':')[1];
	} else {
		pre = words[0];
		title = words.slice(1).join(' ').split(';')[0];
		subtitle = words.slice(1).join(' ').split(';')[1];
	}
	return {pre, title, subtitle};
}


const singleId = (ref)=>{var res = ref.match(/\d+/g)? ref.match(/\d+/g)[0]: null; return res};
const singleName = (ref)=>{var res = ref.match(/>.+?</g)? ref.match(/>.+?</g)[0].replace(/>|</g, '') : null; return res};

const paraSites = (para, i)=>{
	var agObj={};
	var ag = para.match(/<name type="place" key="\d+" subtype="site".+?<\/name>/g) ? para.match(/<name type="place" key="\d+" subtype="site".+?<\/name>/g).forEach(ref=> {agObj[singleId(ref)]=singleName(ref)}) : null;
	var arr = Object.keys(agObj).map(key=>{return {id: key, value: agObj[key], p: i? i: [] } })

	return (arr.length>0)? arr : null;
}


const paraAgents = (para)=>{
	var agObj={};
	var ag = para.match(/<name type="pname".+?<\/name>/g) ? para.match(/<name type="pname".+?<\/name>/g).forEach(ref=> {agObj[singleId(ref)]=singleName(ref)}) : null;
	var arr = Object.keys(agObj).map(key=>{return {id: key, value: agObj[key]} })

	return (arr.length>0)? arr : null;

}

const textAdj = (para, i)=>{
	if (para.substring(0,4)==='<hea'){
		return '<h5 class="sect">'+para+'</h5>';
	} else {
		return para;
	}
}




//---------main function to return promised text-----------
export const sampleText = ()=>{

	var chps = ['00a.xml', '01a.xml', '02a.xml', '03a.xml', '04a.xml', '05a.xml', '06a.xml', '07_agents_sites.xml', '08a.xml', '09a.xml', '10a.xml', '11a.xml', '12a.xml', '13a.xml', '14a.xml', '15a.xml', '16a.xml', 'glossarybib.xml'];

	var testEdits = chps.map(each=>{
		return axios.get('./chapters/'+each);
	})

	var results = Promise.all(testEdits).then(event =>{

		var body = event.map(each=>each.data);

		var chapters = body.map((chp, i) => {
			var header = chp.match(/<head>.+?<\/head>|<p>.+?<\/p>(?!<\/note>)/g)[0]

			return {
				chapter: i,
				titles: paraTitle(header, i),
				pageStart: startPage(chp),
				paragraphs: chp.match(/<head>.+?<\/head>|<p>.+?<\/p>(?!<\/note>)/g).map((para,i)=>{
						return {
							text: textAdj(para),
							page: startPage(para),
							notes: paraNotes(para),
							sites: paraSites(para, i),
							agents: paraAgents(para),
							//titles: paraTitles(para),
						};
				}),
				notes: chp.match(/<note.+?<\/note>/g),
				sites: paraSites(chp),
			};

			})

			var pgStart=1;

			chapters.forEach(chapter=>{
				if (chapter.pageStart===null){ chapter.pageStart=pgStart};

				var sitesAll = [];
				var sitesNew ={};
				var headers = []

				chapter.paragraphs.forEach((p,i)=>{
					if (p.page===null && chapter.pageStart!==null && i===0){pgStart=+(chapter.pageStart);p.page=+(chapter.pageStart)
					} else if	(p.page===null) {p.page=pgStart
					} else {pgStart=+(p.page);p.page=+(p.page)}

					sitesAll=(p.sites!== null)? sitesAll.concat(p.sites) : sitesAll ;


					if (p.text.substring(0,3)==='<h5'){
						var words = scrub(p.text);
						headers.push({p:i, value:words});
					}


				})

				sitesAll.forEach(site=>{
					if (sitesNew[site.id]){
						sitesNew[site.id].push(site.p)
					} else {
						sitesNew[site.id]=[site.p];
					}
				})

				if (chapter.sites){

					chapter.sites.forEach(site=>{
						site.p = sitesNew[site.id]
					})
				}
				;

				headers.pop();
				chapter.headers = headers.splice(1);

			})

	return chapters;

	}).catch(console.log);

	return results;

}


     /*}).catch(console.log);*/

//export default testEdits;
