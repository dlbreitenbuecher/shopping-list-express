'use strict';
const items = [{name: "popsicle", price: "1.45" }, { name: "cheerios", price: "3.40" }]

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