import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

test('bcrypt hashes and verifies', async () => {
	const pw = 'secret'
	const hash = await bcrypt.hash(pw, 10)
	const match = await bcrypt.compare(pw, hash)
	expect(match).toBe(true)
})

test('JWT signs and verifies token', () => {
	const user = { id: 1 }
	const token = jwt.sign(user, 'test_secret')
	const decoded = jwt.verify(token, 'test_secret')
	expected(decoded.id).toBe(true)
})
