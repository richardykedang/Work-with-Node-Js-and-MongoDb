const { json } = require('express');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./router/tourRoute')

const app = express();

//1.MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json());

//3 ROUTES
app.use('/api/v1/tours', tourRouter)

//console.log(tours)

//4. SERVER

module.exports = app;