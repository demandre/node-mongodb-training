const url = "mongodb://localhost:27017";
const dbName = 'training';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);

client.connect(function(err, client) {
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    const datesCol = db.collection('dates');

    datesCol.find().toArray(function(err, dates) {
        console.log(dates);
        client.close();
    });
});