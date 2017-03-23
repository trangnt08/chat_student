'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

app.get('/webhooks', function (req, res) {
  if (req.query['hub.verify_token'] === 'EAAVMi6ykpokBAFw4OidZCNeExQh47Wsda5o1HWZCDlUJGimZASpyqHIcHNUpfpMUkkEjrqPQBJw5gUXiEoj6x1ZA8nGGptZBJOT14yW6rB4BHPvZCyFdkKOKZBFUoZAyCRBKzeIREQ8QG5n4ZARHw90D512YV9fMFyazCxJChNrHNzgZDZD') {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'welcome_to_fb_nguyen_thuy_trang') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
