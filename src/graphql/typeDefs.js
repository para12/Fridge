import { gql } from "apollo-server";

/* date는 date.now 를 60*1000 으로 나눈 숫자임*/

const typeDefs = gql`
  type Food {
    id: String!
    name: String!
    quantity: String!
    date: Int!
    shelf: String!
  }

  type Query {
    allFoods: [Food!]!
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
  }
`;

export default typeDefs;
