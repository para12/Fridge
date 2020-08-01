"use strict";

var _apolloServer = require("apollo-server");

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var _typeDefs = _interopRequireDefault(require("./graphql/typeDefs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ApolloServer는 스키마와 리졸버가 반드시 필요함
var server = new _apolloServer.ApolloServer({
  typeDefs: _typeDefs["default"],
  resolvers: _resolvers["default"]
}); // listen 함수로 웹 서버 실행

server.listen({
  port: process.env.PORT || 4000
}).then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});