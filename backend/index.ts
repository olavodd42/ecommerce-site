const express = require('express')
const authRouter = require('./routes/authRoutes.ts')
const protectRouter = require('./routes/protectedRoutes.ts')
const cors = require('cors');
const dotenv = require('dotenv')
const { authenticate } = require('./middleware/protectRoutes')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors());
app.use('/api/users', authRouter)
app.use('/api/users', authenticate, protectRouter)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})