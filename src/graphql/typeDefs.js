import { gql } from "apollo-server";

/* date는 date.now 를 60*1000 으로 나눈 숫자임*/

const typeDefs = gql`
  type Food {
    id: String!
    name: String!
    quantity: String!
    date: Int!
    shelf: String!
    fridgeId: String
    fridge: Fridge
  }

  type Fridge {
    id: String
    name: String
    foods: [Food]
    users: [User]
  }

  type User {
    email: String
    fridgeID: String
    id: String
    fridge: Fridge
    loginSecret: String
  }

  type Query {
    allFoods: [Food!]!
    userlist: [User!]!
  }

  type Mutation {
    addFood(
      id: String!
      name: String!
      quantity: String!
      shelf: String!
      date: Int!
    ): Food!
    deleteFood(id: String!): Food!
    updateQuantity(id: String!, quantity: String!): Food!
    confirmSecret(secret: String!, email: String!): String!
    createAccount(email: String): Boolean!
    requestSecret(email: String): Boolean!
    shareFridge(email: String): Boolean!
  }
`;

export default typeDefs;
