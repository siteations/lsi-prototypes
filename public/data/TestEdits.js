//import React, { Component } from 'react';
//import axios from 'axios';
const axios = require('axios');
const fs = require('fs');


//var testEdits = axios.get('../data/GilpinForest_III.xml')

var contents = fs.readFileSync('./GilpinForest_IIIeditchp2.xml', 'utf8');

/*testEdits.then(event =>{
	var body = event.data.split("<body>")[1].split("</body>")[0];*/
	var body = contents.split("<body>")[1].split("</body>")[0];
	var chapters = body.split(/<div n="\d*" type="section">/g).map((chp, i) => {
			return {
				chapter: i,
				paragraphs: chp.split('<p>').slice(1).map(para=>{
					return {
						text: para.replace(/<g ref="char:EOLhyphen"\/>/g, '')
											.replace(/<pb n="\d*" facs="\S*"\/>/g, '')
											.replace(/<pb n="\d*" facs="\S*" rendition="simple:additions" \/>/g, '')
											.replace(/<note .*<\/note>/g, '*')
											.replace(/\n/g, ' ').replace('</p>', ''),
						page: para.match(/<pb n="\d*"/) ? para.match(/<pb n="\d*"/)[0].match(/\d+/g)[0] : null,
						notes: para.match(/<note .*<\/note>/g)? para.match(/<note .*<\/note>/g).map(item=>item.replace(/<note n="." place="bottom">/g, '').replace('</note>', ''))[0]: null,
						site: para.match(/<site n="\d*" name="(\w|'|\s)*">(\w|'|\s)*<\/site>/g)? para.match(/<site n="\d*" name="(\w|'|\s)*">(\w|'|\s)*<\/site>/g).map(item=> { return {id:item.match(/n="\d*"/g)[0].replace(/n="|"/g, ''), name: item.match(/>(\w|'|\s)*</g)[0].replace(/>|</g, '') }
						}) : null,
					}
				}),
				title: chp.split('<head>')[1].split('</head>')[0],
				pageStart: chp.match(/<pb n="\d*"/) ? chp.match(/<pb n="\d*"/)[0].match(/\d+/g)[0] : null,
			}
		})

	var pgStart=1;

	chapters.forEach(chapter=>{
		if (chapter.pageStart===null){ chapter.pageStart=pgStart};
		chapter.paragraphs.forEach((p,i)=>{
			if (p.page===null && chapter.pageStart!==null && i===0){pgStart=+(chapter.pageStart);p.page=+(chapter.pageStart)
			} else if	(p.page===null) {p.page=pgStart
			} else {pgStart=+(p.page);p.page=+(p.page)}
		})
	})

	console.log(JSON.stringify(chapters))
	fs.writeFileSync('./Gilpin.js', JSON.stringify(chapters))


     /*}).catch(console.log);*/

//export default testEdits;
