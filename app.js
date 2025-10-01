
const express=require('express');
const ConnectToDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');
const logger = require('./middleware/logger');
require('dotenv').config()


//connect to db
ConnectToDB()
// app init
const app=express()


// middelware
app.use(express.json())

app.use(logger)
//security headers

app.use(helmet())
app.use(cors())

//routes
app.use('/doctors',require('./routes/doctor'))
app.use('/patients',require('./routes/patient'))
app.use('/auth',require('./routes/auth'))
app.use('/users',require('./routes/user'))

// middelware
app.use(notFound)
app.use(errorHandler)

// running the server
const port=process.env.PORT||4000;
app.listen(port,()=>{
console.log(`server is rinning on port ${port}`)

})