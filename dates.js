const url = "mongodb://localhost:27017";
const dbName = 'training';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000
const app = express();

app.use(bodyParser.json());

app.post('/chat', function (req, res) {
    let msg = req.body.msg;
    switch (msg) {
        case 'ville':
            res.send('Nous sommes à Paris');
            return;

        case 'météo':
            res.send('Il fait beau');
            return;

        default:
            res.send('Veuillez formuler votre requete dans le param msg: ville ou météo');
            return;
    }
});

app.listen(PORT, function () {
    console.log('Chat-bot with mongo listening on port ' + PORT);
});


/** callback method
client.connect(function(err, client) {
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    const datesCol = db.collection('dates');

    datesCol.find().toArray(function(err, dates) {
        console.log(dates);
        client.close();
    });
});
 */

/** async/await method */
(async function() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const datesCol = db.collection('dates');

        await datesCol.insertOne({date: new Date()});
        let dates = await datesCol.find().toArray();

        console.log(dates);
    } catch (err) {
        console.log(err.stack);
    }

    client.close();
})();