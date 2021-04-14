
var through = require('through2'),
    BatchManager = require('./BatchManager'),
    JSONStream = require('JSONStream'),
    fs = require('fs');

const dumpTo = process.env.DUMP_TO;

function streamFactory( opts ){
  if(dumpTo) {
    const stringifier = JSONStream.stringify('', '\n', '');
    stringifier.pipe(fs.createWriteStream(dumpTo, {flags: 'a'}));
    return stringifier;
  }

  opts = opts || {};
  if( !opts.client ){ opts.client = require('./client')(); }

  var manager = new BatchManager( opts );

  var stream = through.obj( function( item, enc, next ){
    manager.push( item, next );
  }, function(next) {
    manager.end(next);
  });

  // export client
  stream.client = opts.client;

  return stream;
}

module.exports = streamFactory;
