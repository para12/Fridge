import { ApolloServer } from "apollo-server";
import express from "express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import logger from "morgan";
import passport from "passport";
import "./passport";
import { authenticateJWT } from "./passport";
// import "./";

// ApolloServer는 스키마와 리졸버가 반드시 필요함
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// const app = express();
// app.use(logger("dev"));
// app.use(authenticateJWT);
// server.applyMiddleware({ app });

// listen 함수로 웹 서버 실행
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
