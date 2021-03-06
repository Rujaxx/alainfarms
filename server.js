const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const errorHandler = require('./middleware/error')

//load env vars
dotenv.config({path: './config/config.env'})

//connect mongodb
const connectDB = require('./config/db')
connectDB();

//route files 
const auth = require('./routes/auth')

const app = express();

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//cookie parser
app.use(cookieParser())

// Enable CORS
app.use(cors());

app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })

//Mount Routers
app.use('/api/v1/auth', auth)

//ErrorHandler
app.use(errorHandler)

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`server started on ${PORT}`))