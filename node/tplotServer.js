var express = require('express');
var fs = require('fs');
var exec = require('child_process').exec;

var app = module.exports = express.createServer();

app.configure(function() {
    app.use(express.logger({ format: 'dev'}));
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.post('/', function(req, res) {
    //res.send(req.body);
    var filename = "/tmp/tplot.txt";
    var handle = fs.openSync(filename, 'w');
    fs.writeSync(handle, req.body.input, 0);
    //res.contentType('image/png');
    var tplot = exec("tplot -if /tmp/tplot.txt -tf 'date %^-3s' -dk 'binh 1 40,60,90' -o /tmp/timeplot.png -or '640x480'");
    tplot.stderr.on('data', function(data) {
        console.log(data.toString());  
    });
    tplot.stdout.on('data', function(data) {
        console.log(data.toString());  
    });
    res.contentType('image/png');
    res.sendfile('/tmp/timeplot.png');
    
});


app.listen(8085);






