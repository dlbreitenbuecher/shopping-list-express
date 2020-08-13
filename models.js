'use strict';

/****** Class representing a shopping list, which pretends to be built on top of a DB. */
class ShoppingList {
    static items = []
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
        // let item = new Item(name, price)
        let item = { name, price };
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
/****** Class representing an item */
// class Item {
//     constructor(name, price){
//         this.name = name
//         this.item = item
//     }
// }

module.exports = { ShoppingList };