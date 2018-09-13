var fetch = require('isomorphic-fetch');
var SparqlHttp = require('sparql-http-client');

var fs = require('fs');
const { StringDecoder } = require('string_decoder');

const decoder = new StringDecoder('utf8');

const sites = require('../Lists/09sites_Google_preTng.js');

var content = sites.slice(0);

//entry = { imgName: 'original', results: [{term:'ulan name', link: 'subject link', ulan: 'subject id'}, {etc:''} ] } // for each element in list

SparqlHttp.fetch = fetch;

// which endpoint to query
var endpoint = new SparqlHttp({endpointUrl: 'http://vocab.getty.edu/sparql'})

var namesChecked = [];

content.forEach(person=>{
	if (person.type==="site"){
		var name = person.name[0];
	// the SPARQL query itself
		var query = `select * where { ?Subject a skos:Concept; rdfs:label "${name}"; gvp:prefLabelGVP [xl:literalForm ?Term]}`

		//update query based on location info when possible

		// run query with promises
		endpoint.selectQuery(query).then(function (res) {

		  return res.text()

		// result body of the query
		}).then(function (body) {
		  // parse the body for pretty print
		  var result = JSON.parse(body)

		  // output the complete result object
		  //console.log(person, JSON.stringify(result, null, ' '))
		  //console.log(person, result);

		  //formatting result.results.bindings....Subject.value (link), result.results.bindings...Term.value (name)
		  if (result.results.bindings.length>0){

		  	var found = result.results.bindings.map(entry=>{
		  		return entry['Subject'].value.replace('http://vocab.getty.edu/tng/','')
		  	})

		  } else {
		  	var found = []
		  }


		  person.tng = found.join(', ');
		  console.log(person);
		  /*
		  namesChecked.sort((a,b)=>{
		  	if (a.imgName > b.imgName) {
			    return 1;
			  }
			  if (a.imgName < b.imgName) {
			    return -1;
			  }
			  return 0;
		  });*/

		  console.log(content.length);
			//only turn on for updates//-----------------------------------------------
			fs.writeFileSync('../Lists/09sites_tng.js', 'var sites='+JSON.stringify(content)+';\r module.exports=sites');

		// necessary catch the error
		}).catch(function (err) {

		  //console.error(err)

		})

	}

})




