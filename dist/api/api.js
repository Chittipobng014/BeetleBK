'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sqlCollections = require('./sql/sqlCollections');

var _sqlCollections2 = _interopRequireDefault(_sqlCollections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var promise = require('bluebird');
var options = { promiseLib: promise };
var pgp = require('pg-promise')(options);
var connection = "postgres://clgfhgaukuolin:09efedd1bf282ea7dc4b9091b07f94155e1e4d9633a72dddff2ccf70b7ca83e0@ec2-54-83-22-244.compute-1.amazonaws.com:5432/dbhajskmdk85id";
var db = pgp(connection);


var api = {
    getAllBoxs: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            var branchid, allBoxs;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            branchid = req.body.branchid.toString();
                            _context.next = 4;
                            return db.any(_sqlCollections2.default.getAllBoxs, [branchid]);

                        case 4:
                            allBoxs = _context.sent;

                            res.send(200).json({
                                response: {
                                    data: allBoxs,
                                    message: 'Successfully'
                                }
                            });
                            _context.next = 12;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](0);

                            console.log(_context.t0);
                            return _context.abrupt('return', next(_context.t0));

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 8]]);
        }));

        return function getAllBoxs(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }(),
    getAvailableBoxs: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var branchid, availableBoxs;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            branchid = req.body.branchid.toString();
                            _context2.next = 4;
                            return db.any(_sqlCollections2.default.getAvailableBoxs, [branchid]);

                        case 4:
                            availableBoxs = _context2.sent;

                            res.send(200).json({
                                response: {
                                    data: availableBoxs,
                                    message: 'Successfully'
                                }
                            });
                            _context2.next = 12;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](0);

                            console.log(_context2.t0);
                            return _context2.abrupt('return', next(_context2.t0));

                        case 12:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 8]]);
        }));

        return function getAvailableBoxs(_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }(),
    getInuseBoxs: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
            var branchid, inuseBoxs;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            branchid = req.body.branchid.toString();
                            _context3.next = 4;
                            return db.any(_sqlCollections2.default.getInuseBoxs, [branchid]);

                        case 4:
                            inuseBoxs = _context3.sent;

                            res.send(200).json({
                                response: {
                                    data: inuseBoxs,
                                    message: 'Successfully'
                                }
                            });
                            _context3.next = 12;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](0);

                            console.log(_context3.t0);
                            return _context3.abrupt('return', next(_context3.t0));

                        case 12:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[0, 8]]);
        }));

        return function getInuseBoxs(_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }(),
    updateToInuse: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
            var branchid, boxid, passcode, faceid, update;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;
                            branchid = req.body.branchid.toString();
                            boxid = req.body.id.toString();
                            passcode = req.body.passcode.toString();
                            faceid = req.body.faceid.toString();
                            _context4.next = 7;
                            return db.none(_sqlCollections2.default.updateToInuse, [branchid, boxid, passcode, faceid]);

                        case 7:
                            update = _context4.sent;

                            res.send(200).json({
                                data: update,
                                message: 'Successfully'
                            });
                            _context4.next = 15;
                            break;

                        case 11:
                            _context4.prev = 11;
                            _context4.t0 = _context4['catch'](0);

                            console.log(err);
                            return _context4.abrupt('return', next(err));

                        case 15:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[0, 11]]);
        }));

        return function updateToInuse(_x10, _x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }(),
    updateToAvai: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
            var branchid, boxid, update;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;
                            branchid = req.body.branchid.toString();
                            boxid = req.body.id.toString();
                            _context5.next = 5;
                            return db.none(_sqlCollections2.default.updateToInuse, [branchid, boxid]);

                        case 5:
                            update = _context5.sent;

                            res.send(200).json({
                                data: update,
                                message: 'Successfully'
                            });
                            _context5.next = 13;
                            break;

                        case 9:
                            _context5.prev = 9;
                            _context5.t0 = _context5['catch'](0);

                            console.log(err);
                            return _context5.abrupt('return', next(err));

                        case 13:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined, [[0, 9]]);
        }));

        return function updateToAvai(_x13, _x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }()
};
exports.default = { api: api };
//# sourceMappingURL=api.js.map