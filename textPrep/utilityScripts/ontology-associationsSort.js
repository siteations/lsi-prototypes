//see exisitng files... no longer needed...

var fs = require('fs');

const rawOnt = fs.readFileSync('../Lists/ontology-associations-toClean.ttl').toString().split('\n').map(item=>item.replace('\r',''));

var segOnt = [];
var lines='';

//collate
rawOnt.forEach(line=>{
	if (line !== ''){
		lines+=line;
	} else {
		segOnt.push(lines);
		lines='';
	}
})

//match values and return object for ease of use
var ontJson = segOnt.filter(item=>item !== '')
	.map(comp=>{
		//regEx---------------------------
		const idM = comp.match(/dc:identifier\s"\d*?(?=")/gmi), idR = /\D*/g;
		const titleM = comp.match(/dc:title\s"\D*?(?=")/gmi), titleR = /dc:title\s"/g;
		const fullM = comp.match(/gvp:.*?(?=\sa\sowl:ObjectProperty)/gmi), fullR=/gvp:/g;
		const exampM = comp.match(/skos:example\s"\D*?(?=")/gmi), exampR = /skos:example\s"/g;
		const descM = comp.match(/dct:description\s"""\D*?(?=\.E)/gmi), descR = /dct:description\s"""/g;
		const inverseM = comp.match(/\.gvp:.*?(?=\sowl:inverseOf)/gmi), inverseR = /\.gvp:./g;

		return {
			id: idM ? idM[0].replace(idR, '') : null,
			title: titleM ? titleM[0].replace(titleR, ''): null,
			full: fullM ? fullM[0].replace(fullR, ''): null,
			example: exampM ? exampM[0].replace(exampR, '') : null,
			description: descM ? descM[0].replace(descR, '') : null,
			inverse: inverseM ? inverseM[0].replace(inverseR, '') : null,
		}
})

console.log(ontJson);

var ontoDict = {};

ontJson.forEach(item=>{
	ontoDict[item.title]=item.id;
})

console.log(ontoDict);

//fs.writeFileSync('../Lists/gettyOntologyAssoc.js', 'var ont='+JSON.stringify(ontJson)+';\r module.exports=ont');

//fs.writeFileSync('../Lists/gettyOntoDictionary.js', 'var ont='+JSON.stringify(ontoDict)+';\r module.exports=ont');
