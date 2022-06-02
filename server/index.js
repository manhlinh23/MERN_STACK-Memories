import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser'
import postRoutes from './routes/post.js'
import dotenv from 'dotenv'


const app = express()
dotenv.config()

app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors())

app.use('/posts', postRoutes)

app.get('/',(req,res)=>{
    res.send('MOMORIES API')
})

// const CONNECTION_URL = 'mongodb+srv://manhlinh:TN9DsMFDMiWFhnvH@cluster0.qtam7.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT,()=>console.log(`Server on port ${PORT}`)))
.catch((error)=>console.log(error.message));

 