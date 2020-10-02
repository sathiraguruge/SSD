const express = require('express');
const router = express.Router();
const DriveController = require('../controller/DriveController');

router.post('/', (req, res) => {
    DriveController.upload(req).then((data) => {
        res.json(data)
    }).catch(err => {
        res.json(err);
    })
});

module.exports = router;