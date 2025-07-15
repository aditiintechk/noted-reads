// #TODO: what does this file do?

import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
	const token = req.cookies.token
	if (!token) return res.status(401).json({ error: 'unauthorized' })

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		res.status(401).json({ error: 'invalid token' })
	}
}
