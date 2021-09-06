const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

// import routes
const feebackRoutes = require('./routes/feedback.js')

// app
const app = express()

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/api', feebackRoutes);

// port 
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));