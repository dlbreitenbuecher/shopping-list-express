'use strict';

// Imports and Initializations
const express = require('express');
const morgan = require('morgan');
const fakeDb = require('./fakeDb');
const itemsRoutes = require('./itemsRoutes')

const { ExpressError, NotFoundError } = require('./expressError');

const app = express();

//Router

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/items', itemsRoutes)

// Catch All for 404 errors
// app.use(function(req, res, next){
//     const notFoundError = new NotFoundError();
//     return next(notFoundError);
// })


// Error Handler
app.use(function(err,req, res, next) {
    // 500 === internal status error
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});


module.exports = app;