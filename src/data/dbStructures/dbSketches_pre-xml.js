const Sequelize = require('sequelize');
const db = require('./db.js');
const Iconv  = require('iconv').Iconv;
const { StringDecoder } = require('string_decoder');
const crypto = require ('crypto');

var iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE');
const decoder = new StringDecoder('ascii');


// these could also be simple tables for the sake of db completeness... question of how many db calls we want to make vs. passing around simple json for utility use

const gettyRoles = { // should we need role id's for later links
	//aat roles from getty - full list on ulan search page - scrub and return a json of values
}

const ontology = {
	//patron of, created by, visited by, etc.
}; // hold getty ontology defs of properties here.

const uri = {
	// json grab list of uri's for each authority source
	ulan: 'http://vocab.getty.edu/ulan/IDHERE.json',
	snac: 'http://snaccooperative.org/download/IDHERE?type=constellation_json',
	tng: 'http://vocab.getty.edu/tgn/IDHERE.json',
	aat: 'http://vocab.getty.edu/aat/IDHERE.json',

}


//------------------------------------------------- POSTGRESQL DEF'S --------------------------------------------------------------------------------------------------

//---------------------------- AGENTS -------------------------------------------------
const Agents = db.define('agents', {

		    id: {type: Sequelize.INTEGER, notNull: true}, //automated? can that be over ridden in postgreSQL
		    agentId: {type: Sequelize.INTEGER, notNull: true}, // chapter derived number.... initial seeds with chapter corrections and batch additions

		//------------------NAMES AND WORKING VARIANTS
		    nameFirst: {type: Sequelize.STRING, notNull: true}, // utf-8 version
		    nameLast: {type: Sequelize.STRING, notNull: true}, // utf-8 version

		    nameASCII: {type: Sequelize.STRING, //basic biographic formatting & conversions
		    	notNull: true,
		      get() {
		              const preffered = this.getDataValue('nameLast')+','+this.getDataValue('nameFirst');
		              const pref = decoder.write(iconv.convert(preffered)); //utf-8 to ascii conversion for addition to web queries, misc api
		              return pref;
		            },
		        },
		    nameAlternates: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //all possible variations in spelling, order, and common abbreviations see examples from TEI results including hexdecimal codes

		//-----------------AUTHORITY LINKS (WITH FULLER ASSOCIATION NETWORKS)
		    ulan: {type: Sequelize.INTEGER }, // for getty and json semanic associations of roles (aat ontologies), birth/death, associations (avery, caa sources)
		    ulanURI: {
			    type: Sequelize.STRING,
			    get() {
			    	if (this.getDataValue('ulan') !== null || this.getDataValue('ulan') !== undefined){
			    		  const uriId = this.getDataValue('ulan');
			          const link = uri['ulan'].replace('IDHERE', uriId);
			          return link;
			    	} else {
			    		return null;
			    	}
			        },
		    snac: {type: Sequelize.INTEGER }, // ark id....for snac bios and links to Nat archives, Smithsonian, WorldCat, etc. sourcing...
		    snacURI: {
			    type: Sequelize.STRING,
			    get() {
			    	if (this.getDataValue('snac') !== null || this.getDataValue('snac') !== undefined){
			    		  const uriId = this.getDataValue('snac');
			          const link = uri['snac'].replace('IDHERE', uriId);
			          return link;
			    	} else {
			    		return null;
			    	}
			        },

		    //-----------------AUTHORITY OUTLIERS ?
		    auth: Sequelize.STRING, //source beyond core authories, such as loc name authority or other (lacking specific assoc queries/archival data)
		    authId: Sequelize.STRING,
		    authURI: {type: Sequelize.STRING, validation: }, //validate as html


		//-----------------MIN INFO (for non-authority calls)
		    yearBorn: Sequelize.INTEGER, // from text / image lists / ulan, any validations?
		    yearDied: Sequelize.INTEGER,
		    type: {type: Sequelize.ENUM('corporate', 'person', 'unidentified')}, // type - condensed from getty facets, unidentified if not in authorities/refs.
		    profession: {type: Sequelize.ENUM(...Object.keys(gettyRoles))}, // baseline, roles/relations to expand in adjaceny lists
		    //what else would we want to cache here?


		//-----------------ADMIN DATA
		    editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party... logged in or initial seed value
		    pastEditors: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //array of past editors - should set an on update cycle hook for this
		    createdAt: Sequelize.DATE, // automated
		    updatedAt: Sequelize.DATE, //automated
		    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
		    pending: Sequelize.BOOLEAN, // what is our user/editor workflow? // automate to fill as true on post, edit to turn to false (if approved or denied)
		    pastEdits: {type: Sequelize.ARRAY(Sequelize.DATE), notNull: true } //past edits (tei/photo refs?) - should set an on update cycle hook for this

			} //hooks or extra methods?
});



//---------------------------- SITES -------------------------------------------------
const Sites = db.define('sites', {

		    id: {type: Sequelize.INTEGER, notNull: true}, //automated? can that be over ridden in postgreSQL
		    siteId: {type: Sequelize.INTEGER, notNull: true}, // chapter derived number.... initial seeds with chapter corrections and batch additions
		    siteType: {type: Sequelize.ENUM('site', 'subsite'), notNull: true}, // use association table to nest site, subsite.... 1 site to many subsites

		//------------------NAMES AND WORKING VARIANTS
		    name: {type: Sequelize.STRING, notNull: true}, // prefered version for html with utf-8
		    nameASCII: {type: Sequelize.STRING, //basic subject searches simple
		    	notNull: true,
		      get() {
		              const preffered = this.getDataValue('name');
		              const pref = decoder.write(iconv.convert(preffered)); //utf-8 to ascii conversion for addition to web queries
		              return pref;
		            },
		        },
		    nameASCIILong: {type: Sequelize.STRING, //subject searches with specifying location
		      get() {
		      				if (this.getDataValue('gLocation') !== null || this.getDataValue('gLocation') !== undefined){
			      				const preffered = this.getDataValue('name')+'('+this.getDataValue('gLocation')+')';
			              const pref = decoder.write(iconv.convert(preffered)); //utf-8 to ascii conversion for addition to web queries
			              return pref;
		      				} else {
		      					return null;
		      				}
		            },
		        },
		    nameAlternates: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //all possible variations in spelling, order, and common abbreviations see examples from TEI results

		//-----------------AUTHORITY LINKS (WITH FULLER ASSOCIATION NETWORKS)
		    tng: Sequelize.INTEGER, //getty locations (present/history)
		    tngApprox: {type: Sequelize.ENUM('site', 'town', 'region', 'state', 'country')}, //degree of approx location
		    tngURI: {
		        type: Sequelize.STRING,
		        get() {
		        	if (this.getDataValue('tng') !== null || this.getDataValue('tng') !== undefined){
		        		  const uriId = this.getDataValue('tng');
		              const link = uri['tng'].replace('IDHERE', uriId);
		              return link;
		        	} else {
		        		return null;
		        	}
		            },
		    },

		//-----------------BASIC POINT GEOGRAPHY FOR SITES (NOT AUTOMATED FOR SUBSITES, set subsites to null)-----------------------
		    gId: Sequelize.INTEGER,
		    gLocation: Sequelize.STRING, //google variation of state/country for subject searches

		    bioPhysical: Sequelize.INTEGER, //pointer to general biophysical scripted elements or simply put site id on other end

		    coordinates: Sequelize.GEOMETRY('POINT'), //pref. from google, RA's closer tng tags and/or corrected points list (site center, or site mailing address)
		    coordSource: {type: Sequelize.ENUM('google', 'tng', 'manual', null)},
		    //more complex geographies/geometries should be linked as resources - topojosn, geojson, shapefiles - through the resource associations -

		//-----------------MIN INFO (for non-authority calls)
		    constructionDates: { type: Sequelize.ARRAY(Sequelize.Date) }, // from text - primary dates of focus? validations?
		    //residual values: aat styles? from image table
		    //residual values: site types (designed, vernacular, mixed, etc.) from image table
		    //residual values: LD site description (survey, formal analysis, etc.) from chp tables

		//-----------------ADMIN DATA
		    editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party... logged in or initial seed value
		    pastEditors: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //array of past editors - should set an on update cycle hook for this
		    createdAt: Sequelize.DATE, // automated
		    updatedAt: Sequelize.DATE, //automated
		    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
		    pending: Sequelize.BOOLEAN, // what is our user/editor workflow?
		    pastEdits: {type: Sequelize.ARRAY(Sequelize.DATE), notNull: true } //past edits (tei/photo refs?) - should set an on update cycle hook for this

			} //hooks or extra methods?
});

const BioPhysical = db.define('bioPhysical', { // right now assumes 1 per site or subsite - will have to write the scripts to automate finding

				//the data sets are really only good for US/N.Am and parts of Europe or very, broad and low res globally (topo, habitat/climate maps)
				//snapshot of broad contemporary context only, NOT PAST STATES OR FUTURE DYNAMICS

				id: {type: Sequelize.INTEGER, notNull: true}, //automated? can that be over ridden in postgreSQL
		    siteRef: {type: Sequelize.INTEGER, notNull: true}, // siteid

		    plantCommunity: Sequelize.STRING, // short descriptor name
		    plantSource: {type: Sequelize.ENUM('USNVC', 'EUNIS')},
		    plantLink: Sequelize.STRING, // link to source / full definitions textual
				plantGeo: Sequelize.STRING, // link to original spatial files used for comparison/script

				soils: Sequelize.STRING, // short descriptor name
		    soilsSource: {type: Sequelize.ENUM('USDA', 'EU...')},
		    soilsLink: Sequelize.STRING, // link to source / full definitions textual
				soilsGeo: Sequelize.STRING, // link to original spatial files used for comparison/script

				landUse: Sequelize.STRING, // short descriptor name
		    landUseSource: {type: Sequelize.ENUM('USGS', 'EU...')},
		    landUseLink: Sequelize.STRING, // link to source / full definitions textual
				landUseGeo: Sequelize.STRING, // link to original spatial files used for comparison/script

				geology: Sequelize.STRING, // short descriptor name
		    geologySource: {type: Sequelize.ENUM('USGS', 'EU...')},
		    geologyLink: Sequelize.STRING, // link to source / full definitions textual
				geologyGeo: Sequelize.STRING, // link to original spatial files used for comparison/script

				climate: Sequelize.STRING, // short descriptor name
		    climateSource: {type: Sequelize.ENUM('FAO', '...')},
		    climateLink: Sequelize.STRING, // link to source / full definitions textual
				climateGeo: Sequelize.STRING, // link to original spatial files used for comparison/script

				//surrounding 10m raster height-field map tiles
				elevation: //location pt translated into x,y,z of surrounding tile, default scale
		    elevationSource: Sequelize.STRING, //mapbox rgb tiles link
		    elevationLink: Sequelize.STRING, // link to slippery rgb tiles (keep keys, secrets elsewhere)

	}



const Users = db.define('Users', { // admin purposes
				id: {type: Sequelize.INTEGER, notNull: true}, //automated
				last: {type: Sequelize.STRING, notNull: true}, //name
				first: {type: Sequelize.STRING, notNull: true}, //name
				affiliation: { Sequelize.STRING, notNull:true }, //university
				email: {type: Sequelize.STRING, notNull: true, validation: }, // validate email
				password: {
			    type: Sequelize.STRING,
			    set: function (plaintext) {
			      this.setDataValue('password', this.hashPassword(plaintext));
			    }
			  },
			  salt: {
			    type: Sequelize.STRING,
			    defaultValue: function () {
			      return crypto.randomBytes(16).toString('base64');
			    }
			  },

				role: {type: Sequelize.ENUM('admin', 'editor', 'researcher', 'student', 'other', null)}, // need to figure out the hierarchy here between parties and their access to engage - how is this getting assigned in general.

				//--ADMIN DATA - BASICS
			    createdAt: Sequelize.DATE, // automated
			    updatedAt: Sequelize.DATE, //automated
			    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
			    pending: Sequelize.BOOLEAN, // what is our user/editor workflow?
				},
				{ // hooks in here
					instanceMethods: {
				    hashPassword: function (plaintext) {
				      return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64,'sha1').toString('base64');
				    },
				    isPasswordValid: function (attempt) {
				      return this.hashPassword(attempt) === this.password;
				    }
				  },
				}
});


const Resources = db.define('resources', {
	//id: {type: Sequelize.INTEGER, notNull: true}, default automated

//ALL OF THE ATOMIIZING AND XML QUESTIONS HERE!

				type: { type: Sequelize.ENUM('image','text', 'geography', 'dataset', 'composite', 'series'), notNull:true }, // in terms of how we're handling the core-front end pieces

				primary: { type:Sequelize.Integer, notNull:true },//primary association w/ location or author
				primaryType: { type: Sequelize.ENUM('site','agent'), notNull:true },//primary association w/ author etc.

				link: {type: Sequelize.STRING, notNull: true}, // link to files or xml on our site for the METS files or METS files cached from automated searches (how many cross-browser issues might we hit with automation?)
				linkType: {type: Sequelize.ENUM('file','METS'), notNull: true },//kinda just doing this for easy image/captioning options on BBR image collection.


		//-----------------MIN INFO (for non-authority calls and simple files)
				title: {type: Sequelize.STRING, notNull: true}, // for captions, initial tabular lists of resources to peruse, etc.
				rights: {type: Sequelize.ENUM('public domain','creative commons','creative commons attribution', 'private', 'unknown'), notNull:true }, //for usages warnings
				source: {type: Sequelize.STRING, notNull: true}, // rights owner or donation source,
				date: {type: Sequelize.INTEGER}, // year created if known

				keywords: {type: Sequelize.ARRAY(Sequelize.TEXT)}, //what can we do with natural language processing or pull from loc headers

	//-----------------ADMIN DATA
		    editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party... logged in or initial seed value
		    pastEditors: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //array of past editors - should set an on update cycle hook for this
		    createdAt: Sequelize.DATE, // automated
		    updatedAt: Sequelize.DATE, //automated
		    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
		    pending: Sequelize.BOOLEAN, // what is our user/editor workflow?
		    pastEdits: {type: Sequelize.ARRAY(Sequelize.DATE), notNull: true } //past edits (tei/photo refs?) - should set an on update cycle hook for this

});


//right now this is where all theme, content, resource, agent, and site id's intersect - very heavy lifting on this table

const SubResources = db.define('subResources', {
	//id: {type: Sequelize.INTEGER, notNull: true}, default automated

//ALL OF THE ATOMIIZING AND XML QUESTIONS HERE!

				refResource: { type:Sequelize.Integer, notNull:true }, // resource being referenced

				refLocationStart: { type: Sequelize.STRING, notNull: true },//reference to sub-xml location or link, specific page image or ocr or time stamps or pixel area
				refLocationStop: { type: Sequelize.STRING }, // for non-discrete references (like time duration)
				refType: {type: Sequelize.ENUM('excerpt','clip','annotation', 'unknown'), notNull:true }, //is it useful to detail type of selection?

//Details - currently set up with assuming of one core theme/content tag per subResource identification/annotation/excerpt process (makes this kinda like many to many join between resources, themes, contents)
				primary: { type:Sequelize.Integer, notNull:true },//primary association w/ location or author
				primaryType: { type: Sequelize.ENUM('site','agent'), notNull:true },//primary association w/ author etc.

				theme: { type:Sequelize.Integer},//primary association w/ theme by id
				contents: { type:Sequelize.Integer},//primary association w/ contents' aggregated row (see contents for note on structure)

		//-----------------MIN INFO (for non-authority calls and simple files)
				//see Resource for basic data or copy here to save time

				//need to draw out use scenario and interface interaction to say what other directions/notes/info to go here...
				note: Sequelize.TEXT,

	//-----------------ADMIN DATA
		    editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party... logged in or initial seed value
		    pastEditors: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //array of past editors - should set an on update cycle hook for this
		    createdAt: Sequelize.DATE, // automated
		    updatedAt: Sequelize.DATE, //automated
		    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
		    pending: Sequelize.BOOLEAN, // what is our user/editor workflow?
		    pastEdits: {type: Sequelize.ARRAY(Sequelize.DATE), notNull: true } //past edits (tei/photo refs?) - should set an on update cycle hook for this

});

const Theme = db.define('theme', {
			//id: {type: Sequelize.INTEGER, notNull: true}, default automated

//ALL OF THE ATOMIIZING AND XML QUESTIONS HERE!

				theme: { type:Sequelize.TEXT, notNull:true }, // 4 top themes: social systems, science/history of science, site articulations, sensory experience
				subtheme: { type: Sequelize.TEXT},//reference to sub-xml location or link, specific page image or ocr or time stamps or pixel area
				defintion: { type:Sequelize.TEXT, notNull:true }, // 2 sentence definition

//-----------------THICKER INFO--------------------------
				references: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //scanned links to short cannon examples
				//alternately this could be an array of resource ids - to be updated once we've seeded resources

				// potential search aides... needs some thought and diagramming
				contentsPattern: {type: Sequelize.ARRAY(Sequelize.TEXT)}, //this should be a list of the content relationships that are not null or undefined if we want to reverse capture themes... may not be that useful
				keywords: {type: Sequelize.ARRAY(Sequelize.TEXT)}, //what can we do with natural language processing to help identify/define clusters or suggest texts in advance of specific markup

	//--ADMIN DATA - BASIC
  	editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party
    createdAt: Sequelize.DATE, // automated
    updatedAt: Sequelize.DATE, //automated
    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?

});


const Contents = db.define('contents', { // contents and keywords tagging, this is really an association table - each row hosting the links back to the seperate control vocabulary tables for content tags on subResource markup (alternate strategy would be to have content w/ group ids....multiple rows share that group id instead of a single row with all categories)

		//id: {type: Sequelize.INTEGER, notNull: true}, default automated

			//recognizable organisation, named - bosque or allee or partaree or lake, etc. - large enought for immersion (vs. feature = sculpture, furniture)
			landscapeForms: {type: Sequelize.INTEGER} //id ref - should we need full working definitions and hierarchy search of general types
			landscapeForms_Display: {type: Sequelize.STRING} //easy reading aide

			//manipulated topography - cut fill reinforcement wall leveling typologies
			topoAlts: {type: Sequelize.INTEGER}
			topoAlts_Display: {type: Sequelize.STRING}

			//specific plantings - specimens/horticultural/ecological - hierarchies of type/categories needs research
			planting: {type: Sequelize.INTEGER}
			planting_Display: {type: Sequelize.STRING}

			//specific soils/soil ammendments - geo/organic admixtures/components & practices
			soils: {type: Sequelize.INTEGER}
			soils_Display: {type: Sequelize.STRING}

			//visible construction materials, surfacing - tile, macadame, gravel, etc.
			materials: {type: Sequelize.INTEGER}
			materials_Display: {type: Sequelize.STRING}

			//technologies and instruments of maintence - think giedion, nye, and building tools/practices of army corp
			tools: {type: Sequelize.INTEGER}
			tools_Display: {type: Sequelize.STRING}

			//follies to estate lodges, etc...
			buildings: {type: Sequelize.INTEGER}
			buildings_Display: {type: Sequelize.STRING}

			//utilities, circulation, hydraulics, earthworks
			infrastructure: {type: Sequelize.INTEGER}
			infrastructure_Display: {type: Sequelize.STRING}

			//small but distinct element... object not space (bench vs. landscapeForm = bosque)
			feature: {type: Sequelize.INTEGER}
			feature_Display: {type: Sequelize.STRING}

			//climatic effects, affect/sensory apperception, acoustical descriptors
			atmospherics: {type: Sequelize.INTEGER}
			atmospherics_Display: {type: Sequelize.STRING}

			//cycles, durations, dynamics manifest in description or material details like weathering
			temporality: {type: Sequelize.INTEGER}
			temporality_Display: {type: Sequelize.STRING}

			//types of description at work in text/approaches to narrative/argument.... relationship to themes needs to be disentangled
			methodology: {type: Sequelize.INTEGER}
			methodology_Display: {type: Sequelize.STRING}

			//little redundant, given subResource structure
			primaryTheme: {type: Sequelize.INTEGER}
			primaryTheme_Display: {type: Sequelize.STRING}

			//useful second theme
			secondaryTheme: {type: Sequelize.INTEGER}
			secondaryTheme_Display: {type: Sequelize.STRING}

			//natural language processing or simplified loc subjects... need to explore more of the mechanisms here
			// keywords: tbd.
			// keywords_Display: tbd.

			//--ADMIN DATA - BASIC
  	editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party
    createdAt: Sequelize.DATE, // automated
    updatedAt: Sequelize.DATE, //automated
    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?


});

//----------------------------all the Tagging Control Vocabularies here--------------------------------

//just spelling out structure in the first table

const LandscapeForms = db.define('landscapeForms': {

	id: {type: Sequelize.INTEGER, notNull: true}, default automated

	// three levels of specification(?) to capture hierarchies -
	facet: //general facet - forested space vs. open space vs. enclosure etc.
	type: //economic plantations vs. hunting grounds vs. curated clusters.... extent and primary cultural use.
	subtype: // grove, bosque, etc. at this level - subtype entries do not have to be unique

	compositeName: //f:t:subt for display purposes at contents level?

	definition: { type:Sequelize.TEXT, notNull:true }, // short definition or example (pull from glossary where possible)

	source: { type:Sequelize.TEXT, notNull:true }, //interviews, texts reference, or other control vocabularies
	sourceLink: { type:Sequelize.TEXT }, //outward link to control vocab if inherited or analogous

	//admin for origins
  editor: {type: Sequelize.STRING, notNull: true}, //add when seeding final tables
  createdAt: Sequelize.DATE, // automated
  updatedAt: Sequelize.DATE, //automated


});

const TopoAlts;

const Planting;

const Soils;

const Materials;

const Tools;

const Buildings;

const Infrastructure;

const Feature;

const Atmospherics;

const Temporality;

const Methodology;



//-----------------------------------------GENERAL ASSOCIATIONS (basically similar structure)----------------------------------------------------
// form set up so combo (agent + site) or (agent + agent) would then add to appropriate table, predicate def shown to aide in selection
// need to double check the getty ontology to confirm we'll have the full range of associations desired



const AgentAgentAssoc = db.define('agentAgent', { // directional associations, with getty ontologies
	//id: {type: Sequelize.INTEGER, notNull: true}, default automated

	subject: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names)
	predicate: { type:Sequelize.ENUM(...Object.keys(ontology)), notNull:true }, //http://vocab.getty.edu/ontology# object from html crawl
	object: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names)
	def: {type: Sequelize.STRING,
		notNull: true,
		get() {
              const key = this.getDataValue('predicate');
              const relationship = ontology[key]; //simple list of getty ontologies, edit down for key relationships... useful for feedback when submitting additions
              return relationship;
            },
	},

	//--ADMIN DATA - BASIC
  	editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party
    createdAt: Sequelize.DATE, // automated
    updatedAt: Sequelize.DATE, //automated
    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
	},
});


const SiteAgentAssoc = db.define('siteAgent', { // directional associations, with getty ontologies
	//id: {type: Sequelize.INTEGER, notNull: true}, default automated

	subject: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names of sites)
	predicate: { Sequelize.ENUM(...Object.keys(ontology)), notNull:true }, //http://vocab.getty.edu/ontology# created by, studied by, visited by, etc.
	object: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names)
	def: {type: Sequelize.STRING,
		notNull: true,
		get() {
              const key = this.getDataValue('predicate');
              const relationship = ontology[key]; //simple list of getty ontologies, edit down for key relationships... useful for feedback when submitting additions
              return relationship;
            },
	},

	//--ADMIN DATA - BASIC
  	editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party
    createdAt: Sequelize.DATE, // automated
    updatedAt: Sequelize.DATE, //automated
    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
	},
});

const SiteSiteAssoc = db.define('siteSite', { // directional associations, with getty ontologies
	//id: {type: Sequelize.INTEGER, notNull: true}, default automated

	subject: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names of sites)
	predicate: { Sequelize.ENUM(...Object.keys(ontology)), notNull:true }, //http://vocab.getty.edu/ontology# created by, studied by, visited by, etc.
	object: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names)
	def: {type: Sequelize.STRING,
		notNull: true,
		get() {
              const key = this.getDataValue('predicate');
              const relationship = ontology[key]; //simple list of getty ontologies, edit down for key relationships... useful for feedback when submitting additions
              return relationship;
            },
	},

	//--ADMIN DATA - BASIC
  	editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party
    createdAt: Sequelize.DATE, // automated
    updatedAt: Sequelize.DATE, //automated
    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
	},
});

//----------General Associations in advance of specific section markup & engagement, to enable many to many relationships beyond primary assoc.
const ResourceAgentAssoc = db.define('resourceAgent', { // directional associations, with getty ontologies
	//id: {type: Sequelize.INTEGER, notNull: true}, default automated

	subject: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names of sites)
	predicate: { Sequelize.ENUM(...Object.keys(ontology)), notNull:true }, //http://vocab.getty.edu/ontology# created by, studied by, visited by, etc.
	object: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names)
	def: {type: Sequelize.STRING,
		notNull: true,
		get() {
              const key = this.getDataValue('predicate');
              const relationship = ontology[key]; //simple list of getty ontologies, edit down for key relationships... useful for feedback when submitting additions
              return relationship;
            },
	},

	//--ADMIN DATA - BASIC
  	editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party
    createdAt: Sequelize.DATE, // automated
    updatedAt: Sequelize.DATE, //automated
    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
	},
});

const ResourceSiteAssoc = db.define('resourceSite', { // directional associations, with getty ontologies
	//id: {type: Sequelize.INTEGER, notNull: true}, default automated

	subject: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names of sites)
	predicate: { Sequelize.ENUM(...Object.keys(ontology)), notNull:true }, //http://vocab.getty.edu/ontology# material in, drawing of, etc.
	object: {type: Sequelize.INTEGER, notNull: true}, // chapter derived id number (build form to show names)
	def: {type: Sequelize.STRING,
		notNull: true,
		get() {
              const key = this.getDataValue('predicate');
              const relationship = ontology[key]; //simple list of getty ontologies, edit down for key relationships... useful for feedback when submitting additions
              return relationship;
            },
	},

	//--ADMIN DATA - BASIC
  	editor: {type: Sequelize.STRING, notNull: true}, //name of most recent editing party
    createdAt: Sequelize.DATE, // automated
    updatedAt: Sequelize.DATE, //automated
    approved: Sequelize.BOOLEAN, // what is our user/editor workflow?
	},
});




//question of xml structure
/*
const Images;
const Texts;
const Geographies;
const Datasets;
const Composites;
const Series;
*/



module.exports = {
    db,

    Agents,
    Sites,

    Users, // admin

    Resources, //core types (images/slides, texts, composites, datasets or geographies) with link to general xml files or can we break this into finer tables where we only really need the nested structure for texts and composites like image collections or edited student works.
    SubResources, //sub-locations within resources - a page, a print, a paragraph - for excerpt reference and annotation - reference to theme type/subtype and/or aggregate contents row with each markup

    BioPhysical, //BioPhys...secondary or regional contexts - as driven by geolocation - for habitats, climate, geology, soils (as exists)... likely one per site or subsite driven by google pts (low res data sets)

    Contents, // aggregates contents tags for seperate tables below

    Theme, //Hierarchy of 4 main themes and sub-themes with paragraph definitions of each and 3-4 canon references of topii//approachings within this profile - would be nice to have a running set of keywords to associate with Resources/SubResources

    //contents sources
		TopoAlts;
		Planting;
		Soils;
		Materials;
		Tools;
		Buildings;
		Infrastructure;
		Feature;
		Atmospherics;
		Temporality;
		Methodology;



    Glossary, //set TEI into table, incorporate image links - clean-up to work as visual index

    //All in Resources
    /*
    Images, //BBR slides and figures, deliberate additional secondary prints/images here + links(link source for automated captions, source info)
    Texts, //BBR bibliography and note references + links as available, additional secondary sources here + links(text type for automated reader, source info)
    Geographies, //geojson and existing dataset links, collected in advance of trips + links(text type for automated visualization)
    Datasets, //old census materials, tables from curated collections
    Composites, //edit essays and multi-media products
    Series, // like photo albums and internal collections
    */

}
