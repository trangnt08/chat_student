'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var Config = require('./config')
var FB = require('./connectors/facebook')
var Bot = require('./bot')

var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost/studentdb';

// mongo.connect(url, function(err, db) {
//     if (err) {
//         console.log("ER1");
//     };
//     if(db){
//         console.log("OK1")
//     }
//     // assert.equal(null, err);
//     db.collection('point',function (err, collection){
//         collection.find({"mssv":20121234},{"math":1, _id:0}).toArray(function (err, items){
//             if (err) throw err;
//             else{
//                 console.log(items);
//                 console.log(items[0].math);
//                 var point=items[0].math;
//             }
//         });
//     });
// });

// LETS MAKE A SERVER!
var app = express()
app.set('port', (process.env.PORT) || 5000)
// SPIN UP SERVER
app.listen(app.get('port'), function () {
  console.log('Running on port', app.get('port'))
  
})
// PARSE THE BODY
app.use(bodyParser.json())


// index page
app.get('/', function (req, res) {
  res.send('hello world i am a chat bot')
})

// for facebook to verify
app.get('/webhooks', function (req, res) {
  if (req.query['hub.verify_token'] === Config.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')

})

// to send messages to facebook
app.post('/webhooks', function (req, res) {
  var entry = FB.getMessageEntry(req.body)
  // IS THE ENTRY A VALID MESSAGE?
  if (entry && entry.message) {
    if (entry.message.attachments) {
      // NOT SMART ENOUGH FOR ATTACHMENTS YET
      FB.newMessage(entry.sender.id, "That's interesting!")
    } else {
      // SEND TO BOT FOR PROCESSING
      Bot.read(entry.sender.id, entry.message.text, function (sender, reply) {
        FB.newMessage(sender, reply)
      })
    }
  }

  res.sendStatus(200)
})