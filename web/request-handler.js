var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var actions = {
  'GET': function(request, response) {
    var link = '';
    if (request.url === '/' || request.url === '/styles.css' || request.url === '/favicon.ico') {
      link = archive.paths.index;
    } else {
      link = archive.paths.archivedSites + request.url;
    }
    var cb = function(flag) {
      if (flag) {
        httpHelpers.serveAssets(response, link, httpHelpers.sendGetResponse.bind(null, 200));
      } else {

        httpHelpers.sendGetResponse(response, 'Site not archived', 404);
      }
    };
    console.log(archive.isUrlInList(request.url, cb), 'what is it');
    
    
    
  },
  'POST': function(request, response) {
    httpHelpers.collectData(request, httpHelpers.sendPostResponse, response);
  },
  'OPTIONS': function(request, response) {
    httpHelpers.sendResponse(response, null);
  }
};
 
exports.handleRequest = httpHelpers.makeActionHandler(actions);
