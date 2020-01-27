const { Pool } = require('pg');

const PG_URI = 'postgresql://josh@localhost/graphql_sandbox';

// Create a new Postgres connection pool
const pool = new Pool({
  connectionString: PG_URI
});

// // Test Query
// pool.query('SELECT * FROM test', null, (err, result) => {
//   console.log(result.rows);
// });

module.exports = {
  query: (text, params, callback) => {
    console.log('Query', text);
    return pool.query(text, params, callback);
  },
  pool
};
