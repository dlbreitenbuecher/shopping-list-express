'use strict';
const items = []
const { ExpressError, NotFoundError } = require('./expressError');

class fakeDb {

    static all(){
        return items
    }

    static get(name){
        for (let item of items){
            if (item.name === name){
                return item
            }
        }
        throw new NotFoundError()
    }

    static add(name, price){
        let item = { name, price };
        console.log('item' + item)
        items.push(item);
    }

    static delete(name){
        for (let index in items){
            if (items[index].name === name){
                items.splice(index, 1)
            }
        }
    }
}

module.exports = fakeDb;