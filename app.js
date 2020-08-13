'use strict';

// Imports and Initializations
const express = require('express');

const app = express();

const { ExpressError, NotFoundError } = require('./expressError');

const { ShoppingList } = require('./models.js');
const shoppingList = new ShoppingList();

const router = new express.Router();

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/**Returns JSON of shopping list items 
  
  { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
]}
*/

app.get('/items', function(req, res, next){
    try {
        return res.json(shoppingList.items);
    } catch(err) {
        next(err);
    }
})

app.post('/items', function(req, res, next){
    // let (name, price) = req.body;
    try {
        let newItem = req.body;
        let name = newItem.name;
        let price = newItem.price;
        shoppingList.add(name, price);
        return res.json({added: shoppingList.get(name)})
    } catch(err) {
        next(err);
    }
})


// Catch All for 404 errors
app.use(function(req, res, next){
    const notFoundError = new NotFoundError();
    return next(notFoundError);
})


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