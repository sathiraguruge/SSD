//add relevant imports
const { google } = require('googleapis');
const fs = require("fs");
const formidable = require('formidable');
const credentials = require('../playtech-credentials.json');

//initialize client ID
const client_id = credentials.web.client_id;
//initialize client secret
const client_secret = credentials.web.client_secret;
//initialize redirect URL
const redirect_uris = credentials.web.redirect_uris;
//initialize OAuth client with client id, client secret and redirect URL
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

//initialize the controller class
const DriveController = function () {
    this.createFolder = (data) => {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(data, (err, fields, files) => {
                //returns 400 status code for error
                if (err) {
                    return reject({ status: 400, message: err });
                }
                //get the access token from the returned JSON object
                const token = JSON.parse(fields.token);
                //returns 400 status code in case of empty token
                if (token == null) {
                    return reject({ status: 400, message: 'Token not found' });
                }
                //set access token for OAuth authorization
                oAuth2Client.setCredentials(token);
                //define Google OAuth API 
                const drive = google.drive({ version: "v3", auth: oAuth2Client });
                const fileMetadata = {
                    'name': 'PlayTech',
                    'mimeType': 'application/vnd.google-apps.folder'
                };
                //create files in Google Drive
                drive.files.create({
                    resource: fileMetadata,
                    fields: 'id'
                }).then(function (response) {
                    const fileMetadata = {
                        name: files.file.name,
                        parents: [response.data.id]
                    };
                    //create read stream
                    const media = {
                        mimeType: files.file.type,
                        body: fs.createReadStream(files.file.path),
                    };
                    drive.files.create({
                        resource: fileMetadata,
                        media: media,
                        fields: "id",
                        //returns 200 status code with a success message in case of successful file upload
                    }).then(function (response) {
                        resolve({ status: 200, message: 'Image Added Successfully !' });
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