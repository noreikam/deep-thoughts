// import graphql template f'n
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    thoughts(username: String): [Thought]
    users: [User]
    user(username: String!): User
    thought(_id: ID!): Thought
  } 
`;

module.exports = typeDefs;