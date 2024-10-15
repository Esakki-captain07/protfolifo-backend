import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import routes from './src/router/index.js'


const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT

app.use(routes)
app.listen(PORT,()=>console.log(`port listerning on ${PORT}`))