var express = require('express');
var app = express();
var port = 3333 || process.env.port;
var http = require('http');
var server = http.Server(app);
var bodyParser  = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const icons = require('./routes/icons.js');

var url = {};


app.use("/src/icons",icons);

server.listen(3333),function() {
    console.log("listing on port 3333");
}

app.get('/*',(req,res) => {
    res.sendFile(__dirname + req.path);
});

app.get('/src/font/Rimouski.css',(req,res) => {
    res.sendFile(__dirname + '/src/font/Rimouski.css');
});

app.get('/src/font/rimouski_sb-webfont.woff',(req,res) => {
    res.sendFile(__dirname + '/src/font/rimouski_sb-webfont.woff');
});


app.get('/libs/jquery.min.js',(req,res) => {
    res.sendFile(__dirname + '/libs/jquery.min.js');
});

app.get('/src/font/rimouski_sb-webfont.woff2',(req,res) => {
    res.sendFile(__dirname + '/src/font/rimouski_sb-webfont.woff2');
});

app.post('/',(req,res)=>{
    url = req.body;
})

app.post('/getUrl',(req,res)=>{

    req.body = url;
    res.send(req.body);
})

