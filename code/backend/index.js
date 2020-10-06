//add relevant imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Drive = require('./routing/DriveRouting');

//ask the application to use Google Drive
app.use('/api/drive', Drive);

//Server Connection
//makes application to listen to port 3000
const port = process.env.PORT || 3000
app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Server listening on port ' + port);
});