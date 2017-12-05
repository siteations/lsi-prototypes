//basic node script to log/sort place, pname, other tags

const fs = require('fs');

var contents = fs.readFileSync('../Landscape Design/Landscape Design.xml', 'utf8');

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
	unicode: contents.match(/\&#\S*;/g),
	divisions: contents.match(/<div type="\S*">/g)
	};


console.log(matchAll.divisions);

// var chapters = contents.split('<div type="chapter">').map(each=>'<div type="chapter">' + each)
// 		chapters.forEach((chapter, i)=> fs.writeFileSync('../Landscape Design/chapters/'+(i-1).toLocaleString(undefined, { minimumIntegerDigits: 2 })+ '.xml', chapter));

