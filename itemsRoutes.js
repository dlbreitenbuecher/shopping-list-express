const express = require('express')
const db = require("./fakeDb")
const { ExpressError, NotFoundError } = require('./expressError');

const app = express()
const router = new express.Router()



app.get('/', function(req, res, next){
    console.log('/items - GET')

    try {
        return res.json({items: fakeDb.all()});
    } catch(err) {
        next(err);
    }
})

app.post('/', function(req, res, next){
    console.log('/items - POST')
    try {
        let newItem = req.body;
        let name = newItem.name;
        let price = newItem.price;
        
        fakeDb.add(name, price);
        return res.json({added: fakeDb.get(name)})
    } catch(err) {
        next(err);
    }
})

module.exports = router