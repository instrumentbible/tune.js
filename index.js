var express = require('express');
var app = express();
var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://"+host+":"+port)
});

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/index.html');
});
