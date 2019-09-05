const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var url = process.env.DB_URL + process.env.DB_PORT || 27017;

var db = {

    conn : () => {

        return new Promise((resolve, reject) => {

            mongoClient.connect(url, (err, client) => {

                if(err) reject(err);

                assert.equal(null, err);

                console.log(`Connected to the database on port ${process.env.DB_PORT || 27017}`);

                resolve({db: client.db(process.env.DB_NAME), client: client})

            });

        });

    },

    save: (conn, collection, data) => {

        return new Promise((resolve, reject) => {

            coll = conn.db.collection(collection);

            coll.insertMany(data, (err, res) => {

                if(err) reject(err);

                conn.client.close();

                resolve(res);

            });

        });

    }

}

module.exports = db;