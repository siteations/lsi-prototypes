//import React, { Component } from 'react';
import axios from 'axios';


var testEdits = axios.get('../data/ThoreWalde.txt')

testEdits.then(event =>{

	var chapters = event.data.split("<div0 type='chapter'").map((chp, i) => {
			return {
				chapter: i,
				paragraphs: chp.split('<p>').slice(1).map(para=>{
					return {
						text: para.replace('</div0>', '').replace(/<pb n=\d*>/, ''),
						page: para.match(/<pb n=\d*>/) ? para.match(/<pb n=\d*>/)[0].match(/\d+/g)[0] : null,
					}
				}),
				title: chp.split('<p>')[0].match(/(<hi rend="i">.*<\/hi>)/) ? chp.split('<p>')[0].match(/(<hi rend="i">.*<\/hi>)/)[0].replace('<hi rend="i">', '').replace('</hi>', '') : null,
				pageStart: chp.split('<p>')[0].match(/<pb n=\d*>/) ? chp.split('<p>')[0].match(/<pb n=\d*>/)[0].match(/\d+/g)[0] : null
			}
		})

	console.log(chapters)
	return chapters


     }).catch(console.log);

//export default testEdits;
