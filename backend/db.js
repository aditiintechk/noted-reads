const { Pool } = require('pg')

const pool = new Pool({
	user: 'postgres',
	password: 'superuser@123',
	host: 'localhost',
	port: 5432,
	database: 'notedreadsdb',
})

module.exports = {
	query: (text, params) => pool.query(text, params),
}
