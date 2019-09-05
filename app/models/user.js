var user = {

    coll:  'user',

    save: user => {

        global.db.conn().then(conn => {

            return global.db.save(conn, coll, user);

        }).catch(error => {

            throw error;

        });

    }

}

module.exports = user;