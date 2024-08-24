const express = require('express');
const dbConnection = require('./config/db');
require('dotenv').config()


const app = express();

dbConnection()

// Middleware to parse JSON bodies
app.use(express.json());

//Index Page
app.get('/', (req, res)=>{
    res.send('Welcome to VOTING-APP-API...')
})

// const UserController = require('./controller/UserController')
// UserController.createDefaultAdmin()

//UserRoutes
const userRoutes = require('./routes/user')
app.use('/api', userRoutes )

const partyRoutes = require('./routes/party')
app.use('/api', partyRoutes )

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})