const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { UserProfile } = require('../models/userProfile');
var currentdate = new Date();
var date = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

// => localhost:3000/UserProfiles/
router.get('/', (req, res) => {
    UserProfile.find((err, doc) => {
        if (!err) {
             res.send(doc);
             console.log("\n["+date+"] - [GET] UserProfile Data Retreived  :" + doc); 
        }else {
             console.log("\n["+date+"] - [GET]Error in Retriving UserProfiles :" + JSON.stringify(err, undefined, 2)); 
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("\n["+date+"] - [GET]"+`No record with given id : ${req.params.id}`);

    UserProfile.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log("\n["+date+"] - [GET]"+'Error in Retriving UserProfile :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var user = new UserProfile({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        profileimage: req.body.profileimage,
        email: req.body.email,
        password: req.body.password,
    });
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [POST] UserProfile Data Uploaded  :" + doc); 
       }else {
            console.log("\n["+date+"] - [POST] Error in Uploading UserProfiles :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    UserProfile.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [PUT] UserProfile Data Updated  :" + doc); 
       }else {
            console.log("\n["+date+"] - [PUT] Error in Updating UserProfiles :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    UserProfile.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log("\n["+date+"] - [DELETE] UserProfile Data Deleted  :" + doc); 
       }else {
            console.log("\n["+date+"] - [DELETE] Error in Deleting UserProfiles :" + JSON.stringify(err, undefined, 2)); 
       }
    });
});

module.exports = router;