//add relevant imports
const express = require('express');
const router = express.Router();
const DriveController = require('../controller/DriveController');

//post request to login page
router.post('/', (req, res) => {
    DriveController.createFolder(req).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        if (err.status === 500) {
            res.json('Invalid Credentials')
        } else
            res.json(err);
    })
});

module.exports = router;