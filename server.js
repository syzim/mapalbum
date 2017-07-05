var express = require('express');
var app = express();
var favicon = require('serve-favicon');

app.use(express.static('src'));


app.use(favicon('src/favicon.png'));
app.listen(3000,function(){
  console.log("USA Tour Listening on Port 3000!")
})
