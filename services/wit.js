'use strict'

var Config = require('../config')
var FB = require('../connectors/facebook')
var Wit = require('node-wit').Wit
var request = require('request')
var express = require('express')

var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost/studentdb';

var point;
var firstEntityValue = function (entities, entity) {
	var val = entities && entities[entity] &&
		Array.isArray(entities[entity]) &&
		entities[entity].length > 0 &&
		entities[entity][0].value

	if (!val) {
		return null
	}
	return typeof val === 'object' ? val.value : val
}


//noinspection JSAnnotator
var actions = {
	say (sessionId, context, message, cb) {
		// Bot testing mode, run cb() and return
		if (require.main === module) {
			cb()
			return
		}

		console.log('WIT WANTS TO TALK TO:', context._fbid_)
		console.log('WIT HAS SOMETHING TO SAY:', message)
		console.log('WIT HAS A CONTEXT:', context)

		if (checkURL(message)) {
			FB.newMessage(context._fbid_, message, true)
		} else {
			FB.newMessage(context._fbid_, message)
		}

		
		cb()
		
	},

	merge(sessionId, context, entities, message, cb) {
		// Reset the weather story
		delete context.point
		delete context.loc
		

		// Retrive the location entity and store it in the context field
		var loc = firstEntityValue(entities, 'name')
		if (loc) {
			context.loc = loc
		}
		var subject = firstEntityValue(entities,'subject')
		var number = firstEntityValue(entities,'number')
		var s1;

		if (subject && number) {
			// delete context.missingSubject
			context.subject=subject
			context.number=number
			console.log("number")
			console.log(context.number)
		}

		if (subject){
			context.subject=subject
		}
		
		
		// else if(number){
		// 	context.number = number	
		// }
		
		cb(context)
	},

	error(sessionId, context, error) {
		console.log(error.message)
	},

	// list of functions Wit.ai can execute
	['getPoint'](sessionId, context, cb) {
		var s1="mat";
		var number = context.number;
		if (context.subject=="Toán" || "toán" || "Math" || "math") {
			s1="math";
		}
		else if (context.subject=="Hóa" || "hóa" || "chemistry" || "Chemistry") {
			s1="chemistry";
		}

		console.log("subject");
		console.log(context.subject);
		console.log(s1);
		// console.log(context.number);

		context.point=Math.random()*10;
		cb(context)
		delete context.subject
		delete context.number
	},

}

// SETUP THE WIT.AI SERVICE
var getWit = function () {
	console.log('GRABBING WIT')
	return new Wit(Config.WIT_TOKEN, actions)
}

var checkURL = function (url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

module.exports = {
	getWit: getWit,
}

// BOT TESTING MODE
if (require.main === module) {
	console.log('Bot testing mode!')
	var client = getWit()
	// client.interactive()
};
