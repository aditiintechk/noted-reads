import express from 'express'
import { query } from './db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
	res.send('hello world from noted reads')
})

app.get('/api/protected', requireAuth, (req, res) => {
	res.json({ message: `Hello user ${req.user.id}` })
})

// app.get('/api/books', (req, res) => {
// 	res.send('This is the /api/books endpoint ')
// })

// app.get('/api/users', async (req, res) => {
// 	try {
// 		const result = await query('SELECT * FROM users')
// 		res.json(result.rows)
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).send('Internal server error')
// 	}
// })

export default app
