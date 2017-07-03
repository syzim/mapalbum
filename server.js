var express = require('express');
var app = express();
var favicon = require('serve-favicon');

app.use(express.static('dist'));


app.use(favicon('src/favicon2.png'));
app.listen(3000,function(){
  console.log("USA Tour Listening on Port 3000!")
})
