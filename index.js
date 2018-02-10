var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://localhost:27017/";
const http = require('http');
const port = 80;

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
   MongoClient.connect(MongoUrl, function(err, db) {
      if(err) throw err;
      var dbo = db.db("cryptodatacollector");
      dbo.collection("orderbookitem").find({}, function(err, results) {
         if(err) throw err;
         for(var i = 0; i < results.length; i++){
            console.log(results[i]);
         }
      });
   });
})
//start file
