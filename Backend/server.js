const express = require('express');
const path = require('path');

const app = express();

const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = require('graphql');
const graphQLHTTP = require('express-graphql');
const db = require('./models/postgresModel.js');

const TestSchema = new GraphQLObjectType({
  name: 'TestSchema',
  fields: {
    id: { type: GraphQLID },
    test: {
      type: GraphQLString
    }
  }
});

// GraphQL Sandbox
// Create a GraphQL root query object
const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      // type: GraphQLString,
      type: new GraphQLList(TestSchema),
      args: { value: { type: GraphQLString } },
      resolve: (parentValue, args) => {
        const query = 'SELECT * FROM test';
        // Can declare a values array for the second parameter of query accessible via $1, $2 in the query string

        // Can access args via args.value --> field(value: "string")
        return db.pool
          .query(query, null)
          .then(data => data.rows)
          .catch(err => console.log('error', err));
      }
    }
  })
});

const graphqlSchema = new GraphQLSchema({ query: rootQuery });

app.use(
  '/graphql',
  graphQLHTTP({
    schema: graphqlSchema,
    graphiql: true
  })
);

// Database sandbox
app.use((req, res, next) => {
  // Test Query
  // db.query('SELECT * FROM test', null, (err, result) => {
  //   console.log(result.rows);
  // });

  // node-postgres promises (async API)
  // db.pool
  //   .query('SELECT * FROM test', null)
  //   .then(data => console.log(data.rows))
  //   .catch(err => console.log('error', err));

  next();
});

// app.get('/', (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, '../', 'Frontend', 'public', 'index.html')
//   );
// });

app.use(express.static(path.resolve(__dirname, '../', 'Frontend', 'public')));

app.listen(3000, () => {
  console.log('Express listening on port 3000');
});

/*
// Simple GraphQL
const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => 'hello world!!!'
    }
  })
});

// Create a GraphQL Schema
const { buildSchema } = require('graphql');
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

{
  "data": {
    "hello": "Hello world!"
  }
}

*/
