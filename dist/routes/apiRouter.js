'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var api = require('../api/api');
var router = require('express').Router();

router.post('api/getallbox', api.getAllBoxs);

exports.router = router;
//# sourceMappingURL=apiRouter.js.map