var express = require('express');
var app = express();
var staticApp = express();
var bodyParser = require('body-parser');
var dbConnector = require('./dbConnector.js');
var path = require('path');
staticApp.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/insertMe',function(req,res){
   console.log(req.body.pacman);
    dbConnector.insertDocuments(req.body.pacman,function(data){
        res.send(data);
    });
    
});
app.post('/update',function(req,res){
    dbConnector.updateDocuments(req.body.pacman.index,req.body.pacman,function(){
        console.log('updated');
    });
    res.send('updated');
});
app.post('/remove',function(req,res){
    dbConnector.removeDocuments({index:req.body.pacman.index},function(){
        console.log('removed');
    });
    res.send('removed');
});
app.post('/removeAll',function(req,res){
    dbConnector.removeDocuments({index:req.body.pacman.index},function(){
        console.log('removed all');
    });
    res.send('removed all');
});
app.get('/hello',function(req,res){
    res.send('hello');
});
app.get('/fetchPac',function(req,res){
    dbConnector.findDocuments(function(data){
        res.json(data);
    });
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
staticApp.listen(8001);
app.listen(8000);