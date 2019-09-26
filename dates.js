const url = "mongodb://localhost:27017";
const dbName = 'chat-bot';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

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

// Connect to mongo
(async function() {
    try {
        await client.connect();
        console.log("Connected correctly to mongodb server");
    } catch (err) {
        console.log(err.stack);
    }
})();

/** async/await method */
async function setHistory(sender,msg) {
    try {
        const db = client.db(dbName);
        const messagesCol = db.collection('messages');

        await messagesCol.insertOne({from: sender,msg: msg});
        //let messages = await messagesCol.find().toArray();
        //console.log(messages);
    } catch (err) {
        console.log(err.stack);
    }
}

app.post('/chat', function (req, res) {
    let msg = req.body.msg;
    let response = '';
    switch (msg) {
        case 'ville':
            response = 'Nous sommes à Paris';
            break;

        case 'météo':
            response = 'Il fait beau';
            break;

        default:
            response = 'Veuillez formuler votre requete dans le param msg: ville ou météo';

    }

    (async () => {
        await setHistory('user',msg);
        await setHistory('bot',response);
        res.send(response);
    })();
});

app.listen(PORT, function () {
    console.log('Chat-bot with mongo listening on port ' + PORT);
});