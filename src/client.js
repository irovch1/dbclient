const config = require('pelias-config').generate();
const client = require('esclient')(config);

module.exports = function(){
  return client;
};
