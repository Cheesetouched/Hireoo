'use strict';
const sendgrid = require('@sendgrid/mail');
var Alexa = require("alexa-sdk");
var http = require("http");
var request = require('request');
var sendgridkey = "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";
var html = "1. <strong>BEN</strong> - https://drive.google.com/open?id=0B4v-98iIMZbGRUp0RTB3TUxkSkFXNkJKYWFVTUdkc2pacWVr <br/> 2. <strong>DICKSON</strong> - https://drive.google.com/open?id=0B4v-98iIMZbGQXFNS3JyVzVvREduN2JtQ21XM1l6Y3B2eFhr <br/> ";

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'SayHello': function () {
        sendEmail("pingrishabh@gmail.com","recruiting@joveo.com","TOP 5 AI Candidates",html);
        this.response.speak(`Candidate list sent to you on your email.`);
        this.emit(':responseReady');
    },
    'SayHelloName': function () {
        var name = this.event.request.intent.slots.name.value;
        this.response.speak('Hello ' + name)
            .cardRenderer('hello world', 'hello ' + name);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};

function sendEmail(to,from,subject,text) { 
    sendgrid.setApiKey(sendgridkey);
    const msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
    };
    sendgrid.send(msg);
}