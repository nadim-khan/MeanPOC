const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { UserRole } = require('../models/UserRole');
var currentdate = new Date();
var date = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

// => localhost:3000/UserRoles/
router.get('/', (req, res) => {
    UserRole.find((err, doc) => {
        if (!err) {
             res.send(doc);
             console.log("\n["+date+"] - [GET] UserRole Data Retreived  :" + doc); 
        }else {
             console.log("\n["+date+"] - [GET]Error in Retriving UserRoles :" + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("\n["+date+"] - [GET]"+`No record with given id : ${req.params.id}`);

    UserRole.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("\n["+date+"] - [GET]"+'Error in Retriving UserRole :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var role = new UserRole({
        role_name: req.body.role_name,
        sys_role: req.body.sys_role,
        role_desc: req.body.role_desc,
        role_c_date: req.body.role_c_date,
        role_u_date: req.body.role_u_date,
    });
    role.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [POST] UserRole Data Uploaded  :" + doc); 
       }else {
            console.log("\n["+date+"] - [POST] Error in Uploading UserRoles :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var role = {
        role_name: req.body.role_name,
        sys_role: req.body.sys_role,
        role_desc: req.body.role_desc,
        role_c_date: req.body.role_c_date,
        role_u_date: req.body.role_u_date,
    };
    UserRole.findByIdAndUpdate(req.params.id, { $set: role }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [PUT] UserRole Data Updated  :" + doc); 
       }else {
            console.log("\n["+date+"] - [PUT] Error in Updating UserRoles :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    UserRole.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [DELETE] UserRole Data Deleted  :" + doc); 
       }else {
            console.log("\n["+date+"] - [DELETE] Error in Deleting UserRoles :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

module.exports = router;