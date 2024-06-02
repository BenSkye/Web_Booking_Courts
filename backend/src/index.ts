import app from './app'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config({ path: './config.env' })

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RacketRise').then((con) => {
//   console.log('DB connected')
// })
const hostname = process.env.HOSTNAME || 'localhost'
const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
