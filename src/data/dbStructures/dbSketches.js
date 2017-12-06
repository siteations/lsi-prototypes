const Sequelize = require('sequelize');
const db = require('./db.js');


const uriAgents = { // grab web links from authorities
    'ulan': '',
    'lc': '',
    'oxford': ''

}

const uriSites = {
    'tgn': '',
    'lc': '',
    'other': ''
}


const LDText = db.define('LDText', { //broken down to header/paragraph level chunks of TEI, automate from oxygen json (weirdness?) or go with xml at paragraph level (ease of formatting, etc.)?

    id: {type: Sequelize.INTEGER, notNull: true}, //auto-incremented
    xmlId: {type: Sequelize.STRING }, //for notes only... move from endnotes to adjacent links...

    chapter: {type: Sequelize.INTEGER, notNull: true},
    chapterName: {type: Sequelize.STRING, notNull: true}, //from header

    section: {type: Sequelize.INTEGER, notNull: true},
    sectionName: {type: Sequelize.STRING, notNull: true}, //main or notes basically, from header

    subsection: {type: Sequelize.INTEGER},
    subsectionName: {type: Sequelize.STRING}, //core text breakdown, typically 3 subsections w/ headers beyond intro/notes

    textType: {type: Sequelize.ENUM('header', 'p', 'note'), notNull: true}, //others... figures should really be lumped with accompanying paragraph (as reference) and logged in Images / Media
    textOrder: {type: Sequelize.INTEGER, notNull: true}, //location in chapter, for scrollIntoView actions/selection
    text: {type: Sequelize.TEXT, notNull: true}, //xml here

    page: {type: Sequelize.INTEGER, notNull: true}, //to enable use of original index - load chapter, scroll to p
    noteRefs: {type: Sequelize.ARRAY(Sequelize.STRING)}, //to elements within text
  //more complicated associations between agents, sites, figures, images, bibliography, and new theme or network materials
    agentRefsNames: {type: Sequelize.ARRAY(Sequelize.STRING)}, //will need to update entries as we check chapters
    agentRefs: {type: Sequelize.ARRAY(Sequelize.INTEGER)},

    siteRefsNames: {type: Sequelize.ARRAY(Sequelize.STRING)}, //will need to update entries as we check chapters
    siteRefs: {type: Sequelize.ARRAY(Sequelize.INTEGER)},
    //site and subsite here or at general site level

    imageRefs: {type: Sequelize.ARRAY(Sequelize.INTEGER)}, //from figures
    biblioRefs: {type: Sequelize.ARRAY(Sequelize.INTEGER)}, //new note additions

    Edits: {type: Sequelize.STRING, notNull: true}, //last name of editing party
} //hooks or extra methods?
});



const Agents = db.define('agents', {

    id: {type: Sequelize.INTEGER, notNull: true}, // originals needs to be the assigned var by chapter, not auto-incremented...author additions from secondary texts can increment beyond those originals

    name: {type: Sequelize.STRING, notNull: true}, // shortest version for menu's
    nameAlt: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //first entry should be most common
    nameBibl: {
        type: Sequelize.STRING,
        notNull: true,
        get() {
              const preffered = this.getDataValue('NameAlt');
              return preffered[0];
            },//for api searches, index use?
        },

    auth: {type: Sequelize.ENUM('ulan', 'lc', 'oxford')}, //ulan, etc. for actors in text, not necessary with all biblio authors
    authId: {type: Sequelize.INTEGER },
    authURI: {
        type: Sequelize.STRING,
        get() {
              const uriType = this.getDataValue('Auth');
              const uriId = this.getDataValue('AuthId');
              return uriAgents[uriType]+uriId+'.json';
            },
    }, //could leave off

    yearBorn: {type: Sequelize.INTEGER }, // from text / image lists / ulan, any validations?
    yearDied: {type: Sequelize.INTEGER },
    profession: {type: Sequelize.STRING}, // baseline, roles/relations to expand in adjaceny lists
    //what else would we want to cache here?

    Edits: {type: Sequelize.STRING, notNull: true}, //last name of editing party
} //hooks or extra methods?
});




const Sites = db.define('sites', {

    id: {type: Sequelize.INTEGER, notNull: true}, // needs to be the assigned var by chapter, not auto-incremented

    name: {type: Sequelize.STRING, notNull: true}, // shortest version for menu's
    nameAlt: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //first entry should be most common
    nameBibl: {
        type: Sequelize.STRING,
        notNull: true,
        get() {
              const preffered = this.getDataValue('nameAlt');
              const loc = this.getDataValue('gLocation');
              return preffered[0]+'('+loc+')';
            },//for api searches, index use, from contemp geolocation
        },

    auth: {type: Sequelize.ENUM('tgn', 'lc', 'other')}, //really what is there beyond tgn for the historical sites
    authId: {type: Sequelize.INTEGER },
    authApprox: {type: Sequelize.ENUM('site', 'town', 'region', 'state', 'country')}, //degree of approx location
    authURI: {
        type: Sequelize.STRING,
        get() {
              const uriType = this.getDataValue('auth');
              const uriId = this.getDataValue('authId');
              return uriSites[uriType]+uriId+'.json';
            },
    },

    constrAll: { type: Sequelize.ARRAY(Sequelize.INTEGER) }, // from text - primary dates of focus? validations?

    gId: {type: Sequelize.INTEGER, notNull: true},
    gCoordinates: { type: Sequelize.GEOMETRY('POINT'), notNull: true}, // other validations?
    gLocation: {type: Sequelize.TEXT, notNull: true}, //google variation of state/country for subject searches
    boundaries: { type: Sequelize.GEOMETRY('POLYGON') }, //simple outline additions of coordinates

    SubsitesNames: {type: Sequelize.ARRAY(Sequelize.TEXT)}, // listed during collations to enable automation
    // these should be created during seeding/associations 1 site to many subsites
    SubsitesIds: {type: Sequelize.ARRAY(Sequelize.INTEGER)},

//what else would we want to cache here? additional admin categories or structures?
    Edits: {type: Sequelize.STRING, notNull: true}, //last name of editing party
} //hooks or extra methods?
});




const Subsites = db.define('subsites', {

    id: {type: Sequelize.INTEGER, notNull: true}, //auto-increment

    name: {type: Sequelize.STRING, notNull: true}, // shortest version for menu's
    nameAlt: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //first entry should be most common
    nameBibl: {
        type: Sequelize.STRING,
        notNull: true,
        get() {
              const preffered = this.getDataValue('nameAlt');
              const general = this.getDataValue('siteName');
              return preffered[0]+', '+general;
            },//for api subject searches, index use
        },

    constrAll: { type: Sequelize.ARRAY(Sequelize.INTEGER) }, // from text - primary dates of focus? validations?

    //average coordinates of geotagged images - only available after fieldwork
    phIds: {type: Sequelize.ARRAY(Sequelize.INTEGER)},
    phCoordinates: { type: Sequelize.GEOMETRY('POINT')},
    boundaries: { type: Sequelize.GEOMETRY('POLYGON')}, //simple outline additions of coordinates

    // these should be created during seeding/associations 1 site to many subsites
    siteName: {type: Sequelize.STRING, notNull: true}, // listed during collations to enable automation
    siteId: {type: Sequelize.INTEGER},

//what else would we want to cache here? additional admin categories or structures?
    Edits: {type: Sequelize.STRING, notNull: true}, //last name of editing party
} //hooks or extra methods?
});

const Images = db.define('images', {

    id: {type: Sequelize.INTEGER, notNull: true}, //auto-increment

    name: {type: Sequelize.STRING, notNull: true}, // shortest version for menu's
    nameAlt: {type: Sequelize.ARRAY(Sequelize.TEXT), notNull: true}, //first entry should be most common
    nameBibl: {
        type: Sequelize.STRING,
        notNull: true,
        get() {
              const preffered = this.getDataValue('nameAlt');
              const general = this.getDataValue('siteName');
              return preffered[0]+', '+general;
            },//for api subject searches, index use
        },

    constrAll: { type: Sequelize.ARRAY(Sequelize.INTEGER) }, // from text - primary dates of focus? validations?

    //average coordinates of geotagged images - only available after fieldwork
    phIds: {type: Sequelize.ARRAY(Sequelize.INTEGER)},
    phCoordinates: { type: Sequelize.GEOMETRY('POINT')},
    boundaries: { type: Sequelize.GEOMETRY('POLYGON')}, //simple outline additions of coordinates

    // these should be created during seeding/associations 1 site to many subsites
    siteName: {type: Sequelize.STRING, notNull: true}, // listed during collations to enable automation
    siteId: {type: Sequelize.INTEGER},

//what else would we want to cache here? additional admin categories or structures?
    Edits: {type: Sequelize.STRING, notNull: true}, //last name of editing party
} //hooks or extra methods?
});



module.exports = {
    db,

    LDText,

    Agents,
    Sites,
    Subsites,

    Index, //set TEI into table to pull in basic text (ref by pages)
    Glossary, //set TEI into table, incorporate image links - clean-up to work as visual index
    //needs in terms of full text search?

    //All below associated with an agent or a site, deliberately added
    Images, //BBR slides and figures, deliberate additional secondary prints/images here + links(link source for automated captions, source info)
    Texts, //BBR bibliography and note references + links as available, additional secondary sources here + links(text type for automated reader, source info)
    Geographies, //geojson and existing dataset links, collected in advance of trips + links(text type for automated visualization)
    OtherData, //old census materials, tables from curated collections

    //Automated api results
    Resources, //Automated subject/agent searches cached/compared - need to specify result types - images/slides, texts, datasets or geographies

    //Customized geographic searches/dataset
    Contexts, //secondary or regional contexts - as driven by geolocation - for habitats, climate, geology, soils (as exists)

    //All the content tagging
    Contents,
    //curated ENUM lists to structure postgreSQL as derived from control vocab tables - terms, source, aat id or aat lateral/equiv or parent id

}
