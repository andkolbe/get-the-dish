import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import config from '../config';

const s3 = new aws.S3({
    accessKeyId: config.keys.aws_key_id,
    secretAccessKey: config.keys.aws_secret_key
})

const storage = multerS3({
    s3,
    bucket: 'get-the-dish',
    acl: 'public-read',
    metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
    }
})



export const upload = multer({ storage })