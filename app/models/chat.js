var chat = {

    coll:  'chat',

    save: chat => {

        global.db.conn().then(conn => {

            return global.db.save(conn, coll, chat);

        }).catch(error => {

            throw error;

        });

    }

}

module.exports = chat;