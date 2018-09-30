const fs = require('fs');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");

const assoc = require('../Lists/07association.js');
const res = require('../Lists/07resources_postZotero.js');

var check=res.filter(item=>item.zoteroUrl);

console.log(assoc.length, check.length);
