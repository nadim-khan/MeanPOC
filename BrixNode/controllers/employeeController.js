const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');
var currentdate = new Date();
var date = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

// => localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, doc) => {
        if (!err) {
             res.send(doc);
             console.log("\n["+date+"] - [GET] Employee Data Retreived  :" + doc); 
        }else {
             console.log("\n["+date+"] - [GET]Error in Retriving Employees :" + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("\n["+date+"] - [GET]"+`No record with given id : ${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("\n["+date+"] - [GET]"+'Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [POST] Employee Data Uploaded  :" + doc); 
       }else {
            console.log("\n["+date+"] - [POST] Error in Uploading Employees :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [PUT] Employee Data Updated  :" + doc); 
       }else {
            console.log("\n["+date+"] - [PUT] Error in Updating Employees :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [DELETE] Employee Data Deleted  :" + doc); 
       }else {
            console.log("\n["+date+"] - [DELETE] Error in Deleting Employees :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

module.exports = router;