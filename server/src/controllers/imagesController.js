const Image = require("../models/image");
const Comment = require("../models/comment");
const Recipe = require("../models/recipe");
const asyncHandler = require("express-async-handler");
// const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
import { S3Client, DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv'; 
dotenv.config();

const s3 = new S3Client({
    credentials:{
      accessKeyId: process.env.AWSAccessKeyId,
      secretAccessKey: process.env.AWSSecretKey
    },
    region: 'us-west-1',
  });

exports.get_comments = asyncHandler(async(req, res, next) => {
    // Comment.findById(req.params.id).populate('replies').then((comment) =>{
    //     res.status(200).send(comment);
    // });
});

exports.create_image = asyncHandler(async(req, res, next) => {
    const image = new Image(req.body);
    const imgs = req.files.map(f => ({ url: f.location, filename: f.key }));
    image.imgDataArr.push(...imgs);
    image.upvotes = 0;
    await image.save();
    const response = await Recipe.findByIdAndUpdate(req.body.recipe_id, {$push:{images:image._id}});
    res.status(200).send(response);
});

exports.edit_image = asyncHandler(async(req, res, next) => {
    req.body.imgDataArr = JSON.parse(req.body.imgDataArr);
    const image = new Image(req.body);
    const imgs = req.files.map(f => ({ url: f.location, filename: f.key }));
    image.imgDataArr.push(...imgs);

    // delete images from s3

    if (req.body.deleteImgs && typeof req.body.deleteImgs != 'string') {
        let delObjArr = [];
        for (let filename of req.body.deleteImgs) {
            delObjArr.push({Key: filename});
        }
        const command = new DeleteObjectsCommand({
            Bucket: 'aprendamos-a-cocinar',
            Delete: {
              Objects: delObjArr,
            },
        });
        console.log("FNs: ", delObjArr);
    
        try {
        // await s3.send(command);
        await s3.send(command, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });
        console.log(`Successfully deleted objects from S3 bucket. Deleted objects:`,);
        } catch (err) {
        console.error(err);
        }
    }else if(req.body.deleteImgs && typeof req.body.deleteImgs === 'string'){
        let filename = req.body.deleteImgs;
        const command = new DeleteObjectCommand({
            Bucket: 'aprendamos-a-cocinar', 
            Key:filename
        });
        try{
            const deleteObjResponse = await s3.send(command, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
              });
            console.log(`Successfully deleted object from S3 bucket. Deleted object:`,);
        }catch(err){
            console.log("error", err);
        }
    }

    // update mongo
    
    const response = Image.findByIdAndUpdate(req.params.id, {description: image.description, upvotes: image.upvotes, imgDataArr: image.imgDataArr}).then((res) => {
    }).catch((err) => {
        console.log("ERROR: ", err);
    });
    res.status(200).send(response);
});