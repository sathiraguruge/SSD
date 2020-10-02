const {google} = require('googleapis');
const fs = require("fs");
const formidable = require('formidable');
const credentials = require('../playtech-credentials.json');

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const DriveController = function () {
    this.createFolder = (data) => {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(data, (err, fields, files) => {
                if (err) {
                    return reject({status: 400, message: err});
                }
                const token = JSON.parse(fields.token);
                if (token == null) {
                    return reject({status: 400, message: 'Token not found'});
                }
                oAuth2Client.setCredentials(token);
                const drive = google.drive({version: "v3", auth: oAuth2Client});
                const fileMetadata = {
                    'name': 'PlayTech',
                    'mimeType': 'application/vnd.google-apps.folder'
                };
                drive.files.create({
                    resource: fileMetadata,
                    fields: 'id'
                }).then(function (response) {
                    const fileMetadata = {
                        name: files.file.name,
                        parents: [response.data.id]
                    };
                    const media = {
                        mimeType: files.file.type,
                        body: fs.createReadStream(files.file.path),
                    };
                    drive.files.create({
                        resource: fileMetadata,
                        media: media,
                        fields: "id",
                    }).then(function (response) {
                        resolve({status: 200, message: 'Image Added Successfully !'});
                    }, function (err) {
                        // handle error here.
                        console.error("Execute error", err);
                    });
                }, function (err) {
                    // handle error here.
                    console.error("Execute error", err);
                });
            });
        })
    };
};

module.exports = new DriveController();