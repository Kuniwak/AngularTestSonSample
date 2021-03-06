'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment/index');

// Passport Configuration
require('./local/passport').setup(config);

var router = express.Router();

router.use('/local', require('./local/index'));

module.exports = router;
