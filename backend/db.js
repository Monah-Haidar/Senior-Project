import Pool from 'pg';

// Set up database connection details
const pool = new Pool({
  user: 'postgres',     // database username
  host: 'localhost',        // database host
  database: 'TerraTrade', // database name
  password: '1234', // database password
  port: 5432,               // database port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
