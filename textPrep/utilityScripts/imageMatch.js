const fs = require('fs');

//------------------------cvs to consolidated json----------------------------------
/*
const contents = fs.readFileSync(`../Lists/images_FLS_LocationsInventoryUTF8_tab.csv`, 'utf8').split('\n');
// const labels = contents[0].split('\t').map((item,i)=>{
// 	return i+'_'+item;
// });
const lab = contents[0].split('\t'); // raw label match

	contents.shift();

	const images = contents.map(row=>{
		var obj={};

		row.split('\t').forEach((item,i)=>{
			var key =lab[i];

			if (obj[key] && item!== ''){
				obj[key].push(item);
			} else if (item!== ''){
				obj[key] = [item];
			};

		})

		return obj;
	})

console.log(images[0]);

fs.writeFileSync(`../Lists/imageList_FLS.js`, 'var images='+JSON.stringify(images)+'; module.exports = images');
*/

//------------------------integrate google from images_bysites----------------------------------

/*

const full = require('../Lists/imageList_FLS.js');
const sited = require('../Lists/images_bysites_GoogleClean.js');

const ids = sited.map(loc=>{
	var obj ={};
	obj.ids = loc.images.map(item=>item.id);
	obj.location = {
		geo: loc["location_google"],
		g_id: loc["g_id"]? loc["g_id"] : null ,
	};
	return obj;
})


// "image.ID": ["1900046"],
//     "sheet name": ["Week 13-3"],
//     "Title": ["Chatêau de Chantilly"],
//     "Title.object": ["La Grange (Perspective)"],
//     "Title.workType": ["Designed Landscapes"],
//     "Title.imageView": ["drawing"],


// for geography, match by Title

full.forEach(item=>{
	if (item["image.ID"]){
		var siteID = item["image.ID"][0];
		console.log(siteID);
		var entry = ids.filter(loc=>{
		return loc.ids.includes(siteID.toString());
		});
		item.location = entry[0].location;
	}

})

console.log(full[0], full[1]);
//fs.writeFileSync(`../Lists/imageList_FLS_geo.js`, 'var images='+JSON.stringify(full)+'; module.exports = images');

*/

//-----------------------------------integrate google from images_bysites----------------------------------

/*
http://community.village.virginia.edu/cultural_landscapes/media/images/FLS_Slide_Collection/xlarge/1000020.jpg

or

http://community.village.virginia.edu/cultural_landscapes/media/images/FLS_Slide_Collection/medium/1000020.jpg

or

http://community.village.virginia.edu/cultural_landscapes/media/images/FLS_Slide_Collection/thumb/1000020.jpg
*/

var strg = 'http://community.village.virginia.edu/cultural_landscapes/media/images/FLS_Slide_Collection/medium/';

const full = require('../Lists/imageList_FLS_geo.js');
const chpImages = require('../Lists/imageList_chapters.js');


// "image.ID": ["1900046"],
//     "sheet name": ["Week 13-3"],
//     "Title": ["Chatêau de Chantilly"],
//     "Title.object": ["La Grange (Perspective)"],
//     "Title.workType": ["Designed Landscapes"],
//     "Title.imageView": ["drawing"],

const options = full.map(item=>{
	//var subj = item["Title.object"]? item["Title"].concat(item["Title.object"]) : item["Title"];

	return {
		altId: item['image.ID']? item['image.ID'][0] : null,
		graphic: item['image.ID']? strg+item['image.ID'][0]+'.jpg' : null,
		subject: item["Title"],
		sub: item["Title.object"]? item["Title.object"] : null,
		credit: item["Rights"],
	}
});

chpImages.forEach(item=>{
		var res = options.filter(image=>{
				return item.short.includes(image.subject);
			})
	item.options = res;
})

//initial matches to check manually for priorities....

console.log(chpImages);
fs.writeFileSync(`../Lists/imageList_chapterSorting.js`, 'var images='+JSON.stringify(chpImages)+'; module.exports = images');

//console.log(options);



