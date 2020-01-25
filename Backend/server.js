const express = require('express');
const path = require('path');

const app = express();

const { buildSchema } = require('graphql');
const graphQLHTTP = require('express-graphql');
const db = require('./models/postgresModel.js');

// GraphQL Sandbox
// Create a GraphQL Schema
const qlSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootResolvers = {
  hello: () => {
    return 'Hello world!';
  }
};

app.use(
  '/graphql',
  graphQLHTTP({
    schema: qlSchema,
    rootValue: rootResolvers,
    graphiql: true
  })
);

// Database sandbox
// app.use((req, res, next) => {
//   console.log(req.body, 'body');

//   // Test Query
//   db.query('SELECT * FROM test', null, (err, result) => {
//     console.log(result.rows);
//   });

//   next();
// });

// app.get('/', (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, '../', 'Frontend', 'public', 'index.html')
//   );
// });

app.use(express.static(path.resolve(__dirname, '../', 'Frontend', 'public')));

app.listen(3000, () => {
  console.log('Express listening on port 3000');
});
