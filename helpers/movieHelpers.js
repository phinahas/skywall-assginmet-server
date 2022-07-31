const db = require('../config/connection');
const collection = require('../config/collections');
const objectId = require('mongodb').ObjectID;


module.exports={

    createMovie:(movie) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.MOVIES).insertOne(movie).then(()=>{
                resolve();
            })
        })

    }

}