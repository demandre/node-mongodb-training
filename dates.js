const url = "mongodb://localhost:27017";
const dbName = 'training';
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);

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