require('dotenv').config()         //first line

const express = require("express");   // 1 - express() returns all functionalities so it is stored in a variable
const cors=require('cors');             // 3



//importing the router from router.js
const router = require('./routes/router')

const pfServer=express()   // 2 - server created, creates an express application
pfServer.use(cors());   // 4 - telling the server to use cors to ensure security - () empty paranthesis means allow from all resources
pfServer.use(express.json())  // 5 - Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

//using router which is imported, not a method
pfServer.use(router);

//to access files using express.static()
pfServer.use('/uploads',express.static('./uploads'))

//import dbConnection to index.js
require('./database/dbConnection')

const PORT=3000 || process.env.PORT;               // 6  creating port

pfServer.listen(PORT,()=>{      // 7
    console.log(`pf server is succesfully running in port ${PORT}`)
})