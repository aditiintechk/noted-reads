// connect backend with db

import { Pool } from 'pg'

export const pool = new Pool({
	user: 'postgres',
	password: 'superuser@123',
	host: 'localhost',
	port: 5432,
	database: 'notedreadsdb',
})

export function query(text, params) {
	return pool.query(text, params)
}
