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
app.use('/chartjs', express.static(__dirname + '/node_modules/chartjs/'));
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
     var q = OrderBookItem.find({'order_type': 'sell'}).sort({'price': +1}).exec(function(error, results){
      var labels = [];
      var data = [];
      var lowest = results[0].price;
      labels.push(lowest);
      data.push(0);
      for(var i = 1; i < 10; i++){
        labels.push(lowest + i*.01*lowest)
        data.push(0);
      }
      var sent = 0;
      var i = 0;
      results.forEach(function(item){
        if(item.price <= labels[i])
          data[i] += item.amount
        else if(i < 9){
          data[++i] += item.amount;
        }else if(sent == 0)
        {
          for(i = 1; i<10; i++)
            data[i] += data[i-1];
          var html = template({ pageTitle: 'Home', youAreUsingJade: '1', label: labels, values: data})
          res.send(html);
          sent = 1;
        }
      });
     });
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
