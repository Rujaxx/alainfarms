const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

//load env vars
dotenv.config({path: './config/config.env'})

//connect mongodb
const connectDB = require('./config/db')
connectDB();

const app = express();

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`server started on ${PORT}`))