const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require("fs");
const formidable = require('formidable');
const credentials = require('./playtech-credentials.json');

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Drive = require('./routing/DriveRouting');

app.use('/api/drive', Drive);
//
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
//
// app.post('/fileUpload', (req, res) => {
//     var form = new formidable.IncomingForm();
//     form.parse(req, (err, fields, files) => {
//         if (err) return res.status(400).send(err);
//         const token = JSON.parse(fields.token);
//         if (token == null) return res.status(400).send('Token not found');
//         oAuth2Client.setCredentials(token);
//         console.log(files.file);
//         const drive = google.drive({ version: "v3", auth: oAuth2Client });
//         const fileMetadata = {
//             name: files.file.name,
//         };
//         const media = {
//             mimeType: files.file.type,
//             body: fs.createReadStream(files.file.path),
//         };
//         drive.files.create(
//             {
//                 resource: fileMetadata,
//                 media: media,
//                 fields: "id",
//             },
//             (err, file) => {
//                 oAuth2Client.setCredentials(null);
//                 if (err) {
//                     console.error(err);
//                     res.status(400).send(err)
//                 } else {
//                     res.send('Successful')
//                 }
//             }
//         );
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));