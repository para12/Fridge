"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = require("@prisma/client");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var prisma = new _client.PrismaClient();
var resolvers = {
  Query: {
    allFoods: function () {
      var _allFoods = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var allFoods;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return prisma.foods.findMany();

              case 2:
                allFoods = _context.sent;
                return _context.abrupt("return", allFoods);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function allFoods() {
        return _allFoods.apply(this, arguments);
      }

      return allFoods;
    }()
  },
  Mutation: {
    addFood: function () {
      var _addFood = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref) {
        var id, name, quantity, shelf, date, newFood;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref.id, name = _ref.name, quantity = _ref.quantity, shelf = _ref.shelf, date = _ref.date;
                _context2.next = 3;
                return prisma.foods.create({
                  data: {
                    id: id,
                    name: name,
                    quantity: quantity,
                    shelf: shelf,
                    date: date
                  }
                });

              case 3:
                newFood = _context2.sent;
                return _context2.abrupt("return", newFood);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function addFood(_x, _x2) {
        return _addFood.apply(this, arguments);
      }

      return addFood;
    }(),
    deleteFood: function () {
      var _deleteFood = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref2) {
        var id, deletedFood;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref2.id;
                _context3.next = 3;
                return prisma.foods["delete"]({
                  where: {
                    id: id
                  }
                });

              case 3:
                deletedFood = _context3.sent;
                return _context3.abrupt("return", deletedFood);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteFood(_x3, _x4) {
        return _deleteFood.apply(this, arguments);
      }

      return deleteFood;
    }(),
    updateQuantity: function () {
      var _updateQuantity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref3) {
        var id, quantity, quantityUpdateFood;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref3.id, quantity = _ref3.quantity;
                _context4.next = 3;
                return prisma.foods.update({
                  data: {
                    quantity: quantity
                  },
                  where: {
                    id: id
                  }
                });

              case 3:
                quantityUpdateFood = _context4.sent;
                return _context4.abrupt("return", quantityUpdateFood);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateQuantity(_x5, _x6) {
        return _updateQuantity.apply(this, arguments);
      }

      return updateQuantity;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;