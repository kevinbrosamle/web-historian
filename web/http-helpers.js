var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.sendGetResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, exports.headers);
  response.end(data);
};

exports.sendPostResponse = function(response, data) {
  response.writeHead(302, exports.headers);
  // console.log('in here');
  response.end(data);
};

exports.serveAssets = function(response, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(asset, function read(err, data) {
    if (err) {
      throw err;
    }
    callback(response, data);
  });

};

exports.collectData = function(request, response, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  console.log(callback);
  request.on('end', function() {
    // console.log(data, 'this is the data');
    if (data.slice(0, 3) === 'url') {
      callback(data.slice(4));
    } else {
      callback(data);
    }
    exports.sendPostResponse(response, data);
  });
};

exports.makeActionHandler = function(actionMap) {
  return function(request, response) {
    var action = actionMap[request.method];
    if (action) {
      action(request, response);
    } else {
      exports.sendResponse(response, '', 404);
    }
  };
};
// As you progress, keep thinking about what helper functions you can put here!
