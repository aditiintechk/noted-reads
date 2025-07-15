// #TODO: what does a controller do?

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'

export const signup = async (req, res) => {
	//
	const { email, username, password } = req.body
	try {
		const hashed = await bcrypt.hash(password, 10)
		await pool.query(
			'INSERT INTO users(email, username, password) VALUES($1, $2, $3)',
			[email, username, hashed]
		)

		res.status(201).json({ message: 'User created' })
	} catch (error) {
		res.status(500).json({ error: 'signup failed' })
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		const result = await pool.query(
			'SELECT * FROM users WHERE email = $1',
			[email]
		)
		const user = result.rows[0]

		if (!user) return res.status(400).json({ error: 'invalid credentials' })

		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword)
			return res.status(400).json({ error: 'invalid credentials' })

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES,
		})

		res.cookie('token', token, {
			httpOnly: true,
			// to test in local for dev/testing
			secure: false,
			// #TODO: later - secure: process.env.NODE_ENV === 'production',
		})

		res.json({ message: 'logged in' })
	} catch (error) {
		res.status(500).json({ error: 'login failed' })
	}
}
