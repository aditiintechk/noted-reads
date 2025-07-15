import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

// listen to the given port #TODO: put port number in env file
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`server running at port ${PORT}`)
})
