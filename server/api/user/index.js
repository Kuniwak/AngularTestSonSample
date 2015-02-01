'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var config = require('../../config/environment/index');
var auth = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;
