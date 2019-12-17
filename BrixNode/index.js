const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var mainController = require('./controllers/mainController.js');
var port=process.env.port||3000;
var currentdate = new Date();
var date = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(port, () => {
    console.clear()
    console.log("\n**************************************\n \t App Logs   \n\n**************************************");
    console.log("\n["+date+"] - Server started at port : "+port)
});


app.use('/employees', mainController);