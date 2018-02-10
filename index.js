var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var url = "mongodb://localhost:27017/cryptodata";
const http = require('http');
const port = 80;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
   assert.equal(null, err);
   console.log("Connected successfully to server");

   db.close();
});

const requestHandler = (request, response) => {
   console.log(request.url)
   response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
   if (err) {
      return console.log('something bad happened', err)
   }

   console.log(`server is listening on ${port}`)
   MongoClient.connect(url, function(err, db) {
      if(err) throw err;
      var dbo = db.db("cryptodata");
      dbo.collection("orderbookitems").find({}).toArray(function(err, result) {
         if(err) throw err;
         console.log(result);
         db.close();
      });
   });
})
//start file
