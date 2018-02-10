var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
var url = "mongodb://localhost:27017/cryptodata";
const http = require('http');
const mongoose = require('mongoose');
const port = 8080;
const OrderBookItem = require('./models/OrderBookItem');
var express = require('express')
, logger = require('morgan')
, app = express()
, template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')

mongoose.connection.on('error', (err) => {
   console.error(err);
   console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
   process.exit();
 });
mongoose.connect('mongodb://localhost/cryptodata');
 
const requestHandler = (request, response) => {
   console.log(request.url)
   OrderBookItem.find({}, function(err, result) {
      console.log("success");
      if(err) throw err;
      result.forEach(function(r){
         console.log(r);
      });

   response.end('Hello Node.js Server!')
   });
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
   if (err) {
      return console.log('something bad happened', err)
   }

   console.log(`server is listening on ${port}`)
})
//start file
