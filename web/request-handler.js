var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!
var actions = {
  'GET': function(request, response) {
    var link = '';
    var indexLink = false;
    if (request.url === '/' || request.url === '/styles.css' || request.url === '/favicon.ico') {
      var indexLink = true;
      link = archive.paths.index;
      httpHelpers.serveAssets(response, link, httpHelpers.sendGetResponse);
    } else {
      link = archive.paths.archivedSites + request.url;
    }

    var cb = function(flag) {
      if (flag) {
        // httpHelpers.serveAssets(response, link, httpHelpers.sendGetResponse.bind(null, 200));
        httpHelpers.serveAssets(response, link, httpHelpers.sendGetResponse);
      } else {
        httpHelpers.sendGetResponse(response, 'Site not archived', 404);
      }
    };

    if (indexLink === false) {
      archive.isUrlArchived(request.url.slice(1), cb);
    }
    
    
  },

  'POST': function(request, response) {
    httpHelpers.collectData(request, response, function (data) {
      archive.isUrlInList(data, function(flag) {
        if (flag === true) {
          archive.isUrlArchived(request.url, function(flag2) {
            if (flag2 === true) {
              link = archived.archivedSites + request.url;
              httpHelpers.serveAssets(response, link, httpHelpers.sendGetResponse);
            } else {
              httpHelpers.serveAssets(response, archive.paths.loading, httpHelpers.sendGetResponse);
            }
          });
        } else {
          archive.addUrlToList(data, function() {});
          httpHelpers.serveAssets(response, archive.paths.loading, httpHelpers.sendGetResponse);
        }  
      });      
    });
  },

  'OPTIONS': function(request, response) {
    httpHelpers.sendResponse(response, null);
  }
};
 
exports.handleRequest = httpHelpers.makeActionHandler(actions);
