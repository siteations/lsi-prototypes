const fs = require('fs');

const imageList = require('../Lists/imageList_chapterSorting.js');


/*
{
    "chp": "01",
    "id": "4",
    "graphic": "CH1_001.jpg",
    "desc": null,
    "short": "",
    "match": null,
    "options": [],
    "text": null,
    "zoteroID": null,
    "zoteroURL": null
}
*/

var headers = Object.keys(imageList[0]);
var head = headers.join('\t');
var csvHeader  = head.replace('match', 'match.altId\tmatch.graphic\tmatch.credit');
//headers = csvHeader.split('\t');

console.log(csvHeader, headers);


imageList.map(item=>{
	var row=''

	headers.forEach((key,i)=>{

		if (key !== 'match' && key !== 'options' ){
			row += JSON.stringify(item[key]) + '\t' ;
		} else if (key === 'options' ){
			var res = item[key].map(elem=>{
				return JSON.stringify(elem);
			}).join(',');
			row += '['+ res +']'+ '\t';
		}else if (key === 'match'){
			var match = item[key];

			row += match? match.altId + '\t' : '\t';
			row += match? match.graphic + '\t' : '\t';
			row += match? match.credit + '\t' : '\t';
		}
	})

	//console.log(row);
	csvHeader += '\n'+ row;

})

//csvHeader += '\n'+imageList.join('\n');
//console.log(csvHeader);
//console.log(csvHeader);

fs.writeFileSync(`../Lists/excelImageMatches.csv`, csvHeader);



