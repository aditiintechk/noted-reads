const express = require('express')
const db = require('./db')

const app = express()

app.get('/', (req, res) => {
	res.send('hello world from noted reads')
})

app.get('/api/books', (req, res) => {
	res.send('This is the /api/books endpoint ')
})

app.get('/api/users', async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM users')
		res.json(result.rows)
	} catch (error) {
		console.error(error)
		res.status(500).send('Internal server error')
	}
})

module.exports = app
