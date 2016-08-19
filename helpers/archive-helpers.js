var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html'),
  loading: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    var arr = data.toString().split('\n');
    cb(arr);
  });
};

exports.isUrlInList = function(url, cb) {
  var array = [];
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(cb);
    array = data.toString().split('\n');
    if (_.contains(array, url)) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

exports.addUrlToList = function(data, cb) {
  // fs.writeFile(exports.paths.list, (data + '\n'));
  fs.writeFile(exports.paths.list, (data + '\n'), (err) => {
    if (err) {
      throw err;
    }

    if (cb !== undefined) {
      cb();
    }
  });
  
};

exports.isUrlArchived = function(url, cb) {

  fs.readdir(exports.paths.archivedSites, function(err, data) {
    if (err) {
      throw err;
    }
    var array = data.toString().split(',');
    if (_.contains(array, url)) {
      cb(true);
      return true;
    } else {
      cb(false);
      return false;
    }
  });
   
};

exports.downloadUrls = function(array) {
  storage = [];
  
  for (var i = 0; i < array.length; i++) {
    if (!exports.isUrlArchived(array[i], function() {})) {
      storage.push(array[i]);
    }
  }

  storage.forEach(function(url) {
    var path = exports.paths.archivedSites + '/' + url;
    var fd = fs.open(path, 'w', (err, fd) => {});
    fs.writeFile(path, url, (err) => {
      if (err) {
        throw err;
      }
    }); 
  });  
};

