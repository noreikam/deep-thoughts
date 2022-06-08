const express = require('express');
// Apollo server
const { ApolloServer } = require('apollo-server-express');
// typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
// create new Apollo server
const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: authMiddleware
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create new instance of Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate Apollo server with Express application as middleware
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where to test GraphQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call async function to start server
startApolloServer(typeDefs, resolvers);