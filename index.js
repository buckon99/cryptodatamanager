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

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

mongoose.connection.on('error', (err) => {
   console.error(err);
   console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
   process.exit();
 });
mongoose.connect('mongodb://localhost/cryptodata');


app.get('/', function (req, res, next) {
   try {
      /*OrderBookItem.find({}, function(err, result) {
         console.log("success");
         if(err) throw err;

      response.end('Hello Node.js Server!')
      });*/
     var html = template({ pageTitle: 'Home', youAreUsingJade: '1' })
     res.send(html)
   } catch (e) {
     next(e)
   }
 })
 
const requestHandler = (req, res) => {
   console.log(req.url)

   var html = template({ title: 'Home' });
   res.send(html);
}

app.listen(port, (err) => {
   if (err) {
      return console.log('something bad happened', err)
   }

   console.log(`server is listening on ${port}`)
})
//start file
