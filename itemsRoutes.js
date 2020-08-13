const express = require('express')
const fakeDb = require("./fakeDb")
const { ExpressError, NotFoundError } = require('./expressError');

const router = new express.Router()


router.get('/', function(req, res, next){
    console.log('/items - GET')

    try {
        return res.json({items: fakeDb.all()});
    } catch(err) {
        next(err);
    }
})

router.post('/', function(req, res, next){
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

// Returns single item
router.get('/:name', function (req, res, next){
    console.log('/items/:name - GET')
    try{
        let name = req.params.name
        let fetchedItem = fakeDb.get(name)
        return res.json(fetchedItem)
    }
    catch(err){
        next(err)
    }
})

// Updates an item
router.patch('/:name', function (req, res, next){
    console.log('/items/:name - PATCH')
    try{
        let name = req.params.name
        let fetchedItem = fakeDb.get(name)
        fetchedItem.name = req.body.name
        fetchedItem.price = req.body.price

        return res.json(fetchedItem)
    }
    catch(err){
        next(err)
    }
})

// Deletes an item
router.delete('/:name', function (req, res, next){
    console.log('/items/:name - DELETE')
    try{
        let name = req.params.name
        let fetchedItem = fakeDb.delete(name)

        return res.json({message: "Deleted"})
    }
    catch(err){
        next(err)
    }
})


module.exports = router