const { google } = require('googleapis');
const fs = require("fs");
const formidable = require('formidable');
const credentials = require('../playtech-credentials.json');

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);


const DriveController = function () {
    this.upload = (data) => {
        return new Promise((resolve, reject) => {

            var form = new formidable.IncomingForm();
            form.parse(data, (err, fields, files) => {
                if (err) {
                    reject({status: 400, message: err});
                }
                const token = JSON.parse(fields.token);
                if (token == null) {
                    reject({status: 400, message: 'Token not found'});
                }
                oAuth2Client.setCredentials(token);
                console.log(files.file);
                const drive = google.drive({ version: "v3", auth: oAuth2Client });
                const fileMetadata = {
                    name: files.file.name,
                };
                const media = {
                    mimeType: files.file.type,
                    body: fs.createReadStream(files.file.path),
                };
                drive.files.create(
                    {
                        resource: fileMetadata,
                        media: media,
                        fields: "id",
                    },
                    (err, file) => {
                        oAuth2Client.setCredentials(null);
                        if (err) {
                            console.error(err);
                            reject({status: 500, message: err});
                        } else {
                            resolve({status: 200, message: 'Image Added Successfully !'});
                        }
                    }
                );
            });

        })
    };
};

module.exports = new DriveController();