let AWS = require('aws-sdk');

function init() {
    AWS.config.update({ region: process.env.REGION });
}

function getS3() {
    return new AWS.S3({ apiVersion: process.env.API_VERSION });
}

function getFileUrl(fileName) {
    init();
    let s3 = getS3(), params;

    switch (fileName) {
        case 'almoco':
            params = {
                Bucket: process.env.BUCKET_NAME,
                Key: process.env.PDF_KEY_ALMOCO,
            };
            return s3.getSignedUrl('getObject', params);
            break;
        case 'pizzaria':
            params = {
                Bucket: process.env.BUCKET_NAME,
                Key: process.env.PDF_KEY_PIZZARIA,
            };
            return s3.getSignedUrl('getObject', params);
            break;
        case 'delorenzi':
            params = {
                Bucket: process.env.BUCKET_NAME,
                Key: process.env.PDF_KEY_DELORENZI,
            };
            return s3.getSignedUrl('getObject', params);
            break;
    }
}

function uploadFile(file, name) {
    init();
    let s3 = getS3(), params = { Bucket: process.env.BUCKET_NAME, Key: '', Body: '' };

    params.Body = file;
    params.Key = `${process.env.PDF_KEY_FOLDER}/${name}`;

    // call S3 to retrieve upload file to specified bucket
    s3.upload(params, (err, data) => {
        if (err) {
          console.log("Error", err);
        }
    });
}

exports.getFileUrl = getFileUrl;
exports.uploadFile = uploadFile;