const express=require('express');
const mongoose=require('mongoose');

dbUrl='mongodb://localhost:27017/BrixDB';

var currentdate = new Date();
var date = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();



mongoose.connect(dbUrl,(err)=>{
    if(!err){
        console.log("\n["+date+"] - Succesfully connected to DB ["+dbUrl+"] ");
    }else{
        console.log("\n["+date+"] - Error connecting to DB "+JSON.stringify(err,undefined,2));
    }
})

module.exports=mongoose;