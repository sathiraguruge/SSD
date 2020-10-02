const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const Drive = require('./routing/DriveRouting');

app.use('/api/drive', Drive);

// app.post('/readDrive', (req, res) => {
//     if (req.body.token == null) return res.status(400).send('Token not found');
//     oAuth2Client.setCredentials(req.body.token);
//     const drive = google.drive({ version: 'v3', auth: oAuth2Client });
//     drive.files.list({
//         pageSize: 10,
//     }, (err, response) => {
//         if (err) {
//             console.log('The API returned an error: ' + err);
//             return res.status(400).send(err);
//         }
//         const files = response.data.files;
//         if (files.length) {
//             console.log('Files:');
//             files.map((file) => {
//                 console.log(`${file.name} (${file.id})`);
//             });
//         } else {
//             console.log('No files found.');
//         }
//         res.send(files);
//     });
// });

// app.post('/deleteFile/:id', (req, res) => {
//     if (req.body.token == null) return res.status(400).send('Token not found');
//     oAuth2Client.setCredentials(req.body.token);
//     const drive = google.drive({ version: 'v3', auth: oAuth2Client });
//     var fileId = req.params.id;
//     drive.files.delete({ 'fileId': fileId }).then((response) => { res.send(response.data) })
// });
//
// app.post('/download/:id', (req, res) => {
//     if (req.body.token == null) return res.status(400).send('Token not found');
//     oAuth2Client.setCredentials(req.body.token);
//     const drive = google.drive({ version: 'v3', auth: oAuth2Client });
//     var fileId = req.params.id;
//     drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
//         function (err, response) {
//             response.data
//                 .on('end', () => {
//                     console.log('Done');
//                 })
//                 .on('error', err => {
//                     console.log('Error', err);
//                 })
//                 .pipe(res);
//         });
//
// });

//Server Connection
const port = process.env.PORT || 3000
app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Server listening on port ' + port);
});