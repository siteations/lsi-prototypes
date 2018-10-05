import axios from 'axios';
import Promise from 'bluebird';

import hexConv from './hexConversion.js';


//------------------basic regex functions---------------

const startPage = (para)=>{
	var page = para.match(/<pb n="\d*"/) ? para.match(/<pb n="\d*"/)[0].match(/\d+/g)[0] : null;
	return page;
}

const scrub = (text)=>{ //simply cleans out tags after cataloging for left menu
	return text.replace(/<.*?>|<\/.*?>/gmi, '')
}

const paraNotes = (para)=>{
	var notes = para.match(/<ref target=.+?<\/ref>/g) ? para.match(/<ref target=.+?<\/ref>/g).map(ref=> {return {id:ref.match(/"#CH.+?"/g)[0].replace(/"/g, ''), value:ref.match(/-n.+?"/g)[0].replace(/"|-n/g, '')} }) : null;
	return notes;
}

const paraTitle = (header, i)=>{
	var pre, title, subtitle;
// inner contents as array
	header  = hexConv(header);
	var words = header.replace(/<.*?>|<\/.*?>/gm, '').split(' ');

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
const singleName = (ref)=>{var res = ref.match(/>.+?</g)? ref.match(/>.+?</g)[0].replace(/>|</g, '') : null; return res };

const paraSites = (para, i)=>{
	var parag = hexConv(para);
	var fig = parag.match(/<figure/gmi);

	var agObj={};
	var ag = parag.match(/<name type="place" key="\d+" subtype="site".+?<\/name>/g) ? parag.match(/<name type="place" key="\d+" subtype="site".+?<\/name>/g).forEach(ref=> {agObj[singleId(ref)]=singleName(ref)}) : null;
	var arr = Object.keys(agObj).map(key=>{return {id: key, value: agObj[key], p: i? i: [] } })

	return (arr.length>0 && (!fig || !i))? arr : null;
}

const paraResources = (para, i)=>{
	var parag = hexConv(para);

	var agObj={};
	var ag = parag.match(/<hi rend="italic" key=".*?<\/hi>/gmi) ? parag.match(/<hi rend="italic" key=".*?<\/hi>/gmi).forEach(ref=> {agObj[singleId(ref)]=singleName(ref)}) : null;
	var arr = Object.keys(agObj).map(key=>{return {id: key, value: agObj[key], p: i? i: [] } });

	return (arr.length>0 )? arr : null;
}

const paraFig = (para, i)=>{
	var parag = hexConv(para);

	var figId = parag.match(/id="fig-.*?"/gm)? parag.match(/id="fig-.*?"/gm)[0].replace(/id="fig-|"/gm,''): null;
	var figDesc = parag.match(/<figDesc>.*?<\/figDesc>/gm)? parag.match(/<figDesc>.*?<\/figDesc>/gm)[0].replace(/<.*?>|<\/.*?>|Left:|Top:|Right:|Below:|Below;/gm, ''): null;
	var figNum = !figDesc ? null : figDesc.match(/\d*?\.\d*?(?=\.)/gmi)? figDesc.match(/\d*?\.\d*?(?=\.)/gmi)[0] : null;
	var figD = figDesc? figDesc.toString().slice(0,20) : null;
	//add options later - akin to db call

	return (figId)? {figId, figDesc, figD, figNum} : null;
}


const paraAgents = (para)=>{
	var parag = hexConv(para);
	var fig = parag.match(/<figure/gmi);

	var agObj={};
	var ag = parag.match(/<name type="pname".+?<\/name>/g) ? parag.match(/<name type="pname".+?<\/name>/g).forEach(ref=> {agObj[singleId(ref)]=singleName(ref)}) : null;
	var arr = Object.keys(agObj).map(key=>{return {id: key, value: agObj[key]} })

	return (arr.length>0 && !fig)? arr : null;

}

const textAdj = (para, i)=>{
	var parag = hexConv(para);

	if (parag.substring(0,4)==='<hea'){
		parag = '<h5 class="sect">'+parag+'</h5>';
	} else if (parag.substring(0,4)==='<fig'){
		parag = ' ' ;
	} else {
		parag=parag.replace(/lg(?=>)/gmi, 'ul').replace(/l(?=>)/gmi, 'li').replace(/<li>/gmi, '<li class="nb">');
	}

	return parag;

	///lg l to ul and li



}




//---------main function to return promised text-----------
export const sampleText = ()=>{

	var chps = ['00.xml', '01.xml', '02.xml', '03.xml', '04.xml', '05.xml', '06.xml', '07_agents_sites_resources.xml', '08.xml', '09_agents_sites_resources.xml', '10.xml', '11.xml', '12.xml', '13.xml', '14.xml', '15.xml', '16.xml', 'glossarybib.xml'];

	var testEdits = chps.map(each=>{
		return axios.get('./chapters/'+each);
	})

	var results = Promise.all(testEdits).then(event =>{

		var body = event.map(each=>each.data);

		var chapters = body.map((chp, i) => {
			chp = chp.replace(/\n/gm, ' '); //end of line issues; \s*

			var header = chp.match(/<head>.+?<\/head>|<p>.+?<\/p>(?!<\/note>)/g)[0]

			return {
				chapter: i,
				titles: paraTitle(header, i),
				pageStart: startPage(chp),
				paragraphs: chp.match(/<head>.+?<\/head>|<figure.*?<\/figure>|<p>.+?<\/p>(?!<\/note>)/g).map((para,i)=>{
						return {

							text: textAdj(para),
							page: startPage(para),
							notes: paraNotes(para),
							sites: paraSites(para, i),
							agents: paraAgents(para),
							resources: paraResources(para, i),
							figures: paraFig(para),
						};
				}),
				notes: chp.match(/<note.+?<\/note>/g),
				sites: paraSites(chp),
				resources: paraResources(chp),
			};

		})

			var pgStart=1;

			chapters.forEach(chapter=>{
				if (chapter.pageStart===null){ chapter.pageStart=pgStart};

				var sitesAll = [];
				var resAll=[];
				var sitesNew ={};
				var headers = []

				chapter.paragraphs.forEach((p,i)=>{
					if (p.page===null && chapter.pageStart!==null && i===0){pgStart=+(chapter.pageStart);p.page=+(chapter.pageStart)
					} else if	(p.page===null) {p.page=pgStart
					} else {pgStart=+(p.page);p.page=+(p.page)}

					sitesAll=(p.sites!== null)? sitesAll.concat(p.sites) : sitesAll;
					resAll=(p.resources!== null)? resAll.concat(p.resources) : resAll;




					if (p.text.substring(0,3)==='<h5'){
						var words = scrub(p.text);
						var wordHex = hexConv(words);
						headers.push({p:i, value:wordHex});
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

