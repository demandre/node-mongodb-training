# node-mongodb-training

A repo to test mongodb with node and asynchronous code.

## Features

It returns:
 - `Il fait beau` on `POST /chat` request with `{msg:méteo}` data
 - `Nous sommes à Paris` on `POST /chat` request with `{msg:ville}` data
 - JSON of message history on `GET /messages/all`
 
You can also delete last message with `DELETE /messages/last`

## Installation

You must have mongodb installed and running before installing this.

```sh
$ git clone https://github.com/demandre/node-mongodb-training.git
$ cd node-mongodb-training
$ npm install
$ npm start # launch HTTP server on port 3000
```

## Tests

When you've launched the server, you'll be able to test it like this:

```sh
curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" http://localhost:3000/chat
curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"météo\"}" http://localhost:3000/chat 
curl -X GET http://localhost:3000/messages/all
curl -X DELETE http://localhost:3000/messages/last 
curl -X GET http://localhost:3000/messages/all # test if last message was removed
```