const keyGoogle = ''; //need a new api key for processsing

const fs = require('fs');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");
const Iconv  = require('iconv').Iconv;
const { StringDecoder } = require('string_decoder');

var iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE');
const decoder = new StringDecoder('ascii');

const sites = require('../Lists/09sites_preGoogleTng.js');

const sitesSlice = sites.slice();

// so compose google place search (name, country) and google city search (city, country)
// retrieve lat/long for all so generic mapping/errors

/*[ 'siteName',
  'imgCount',
  'subsites',
  'viewTypes',
  'imageIds',
  'creators',
  'tng',
  'dates',
  'aat_style',
  'keywords',
  'loc',
  'tgn_latitude',
  'tgn_longitude' ]*/

var place = [];


sitesSlice.forEach((site, i)=>{
	//note I've done a find/replace for all non utf-8 characters as 'e'
  /*
  var name, city, country;
  (site.siteName !== undefined)? name = site.siteName : name = '';
  (site.location.city !== undefined)? city = site.location.city : city = '';
  (site.location.country !== undefined)? country = site.location.country : country = '';
	*/

	if (site.type==='site'){



	var gPlace = site.name[0];
	var address = 'https://maps.googleapis.com/maps/api/geocode/json?address='+gPlace+'&key='+keyGoogle;
  var add2 = iconv.convert(address);
  const content = decoder.write(add2)

  //console.log(content);


	place.push(axios({
		  		method:'get',
		  		url: content,

			}).then(function(response) {

				var path = decodeURI(response.request.path).replace('/maps/api/geocode/json?address=', '');
				var name = path.replace('&key='+keyGoogle, '').split(',')[0];

				if (response.data.status === 'OK') {console.log('ok request' /*response.data.results[0].formatted_address, name*/)} else {console.log('failure', response.data.results[0], content)}


				var obj = {};
				obj.siteName = name;

						if (response.data.status === 'OK'){
								obj.g_address = response.data.results[0].formatted_address;
								obj.g_latitude = response.data.results[0].geometry.location.lat;
								obj.g_longitude = response.data.results[0].geometry.location.lng;
								obj.g_id = response.data.results[0].place_id;

						} else if (response.data.status !== 'OK'){
							obj.gPlace_result = response.data.status;
						};

						return obj;
  	// 			//add info here and then return site - which will become a new array... not everythin will geocode nicely.
			})
			)

	}

})


Promise.all(place)
	.then(function(responses) {

		responses.forEach(response=>{

        var name = response.siteName;

        sitesSlice.forEach(site=>{
          if (site.name[0] === name){
            site.g_address = response.g_address;
            site.g_latitude = response.g_latitude;
            site.g_longitude = response.g_longitude;
            site.g_id = response.g_id;
            site.gPlace_result = response.gPlace_result;

          }
        })
    })
				//console.log(sitesSlice);
        const stringArray = JSON.stringify(sitesSlice);
        console.log(sitesSlice);
        fs.writeFileSync('../Lists/09geo.js', 'var sites='+stringArray+';\r module.exports=sites');
	})
	.catch(err=>{console.log(err.message)});

