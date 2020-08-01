"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Food {\n    id: String!\n    name: String!\n    quantity: String!\n    date: Int!\n    shelf: String!\n  }\n\n  type Query {\n    allFoods: [Food!]!\n  }\n\n  type Mutation {\n    addFood(\n      id: String!\n      name: String!\n      quantity: String!\n      shelf: String!\n      date: Int!\n    ): Food!\n    deleteFood(id: String!): Food!\n    updateQuantity(id: String!, quantity: String!): Food!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* date는 date.now 를 60*1000 으로 나눈 숫자임*/
var typeDefs = (0, _apolloServer.gql)(_templateObject());
var _default = typeDefs;
exports["default"] = _default;