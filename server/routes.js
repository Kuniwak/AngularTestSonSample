/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors/index');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/products', require('./api/products/index'));
  app.use('/api/purchases', require('./api/purchase/index'));
  app.use('/api/users', require('./api/user/index'));

  app.use('/auth', require('./auth/index'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
