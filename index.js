// The Assignment:
// Please create a simple "Hello World" API. Meaning:
// 1. It should be a RESTful JSON API that listens on a port of your choice. 
// 2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. 
// This message can be anything you want. 

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Insantiate the http web server object
var httpServer = http.createServer(function(req,res) {
    server(req, res);
});

// Start the http web server
httpServer.listen(7000, () => {
    console.log('The server is listening');
});


// server will be called once for each http request that the is received by the httpServer object
 // this funtion will get the requested url, query params, method and body
var server = function(req, res) {

    // parse the requested url - we need to find out what the request path is to correctly respond when /hello is requested
    var parsedUrl = url.parse(req.url,true);

    // once we have the full path, this regex will get the path from the url 
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the payload, if exists
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data',function(data){
        buffer += decoder.write(data);
    });

    req.on('end', function(){
        buffer += decoder.end();
    
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        
        chosenHandler(function(payload) {
           var payloadString = JSON.stringify(payload);
           res.setHeader('Content-type','application/json');
           res.end(payloadString);
        });

    });
};

var handlers = {};

handlers.notFound = function(callback) {
    callback(404);
}

handlers.hello = function(callback) {
    callback({'Message' : 'JSON Welcome Message'});
};

var router = {
    'hello' : handlers.hello
}