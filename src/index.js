import { ApolloServer } from "apollo-server-express";
import express from "express";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import logger from "morgan";
// import passport from "passport";
import "./auth";
import { authenticateJWT, isAuthenticated } from "./auth";
import cors from "cors";

// ApolloServer는 스키마와 리졸버가 반드시 필요함
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, isAuthenticated }),
});

const app = express();
app.use(logger("dev"));
app.use(authenticateJWT);
app.use(
  cors({
    // origin: "http://localhost:3000",
    // origin: process.env.ORIGIN,
    // origin: "*",
    origin: "https://fridge.netlify.app/",
  })
);
server.applyMiddleware({ app });

// listen 함수로 웹 서버 실행
app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀  Server ready at ${server.graphqlPath}`);
});
