import express from "express";
const imageRouter = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');
const imageController = require('../controllers/imagesController');
const { S3Client, DeleteObjectsCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Image = require("../models/image");

const s3 = new S3Client({
  credentials:{
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
  },
  region: 'us-west-1',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read', 
    bucket: 'aprendamos-a-cocinar',
    metadata: (req:any, file:any, cb:any) => {
      cb(null, {fieldname: file.fieldname})
    },
    key: function (req:any, file:any, cb:any) {
        cb(null, new Date().toISOString() + '-' + file.originalname); 
    }
  })
});



// imageRouter.get("/:id",imageController.get_images);
imageRouter.post('/', isLoggedIn, upload.array('form-imgs'), imageController.create_image);
// imageRouter.put("/:id",imageController.edit_image);
// imageRouter.put("/:id", imageController.edit_image);
imageRouter.put("/:id", isLoggedIn, upload.array('form-imgs'),async (req, res, next) =>{
  req.body.imgDataArr = JSON.parse(req.body.imgDataArr);
    const image = new Image(req.body);
    const imgs = (req as any).files.map((f:any) => ({ url: f.location, filename: f.key }));
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
        await s3.send(command, function(err:any, data:any) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
          });
        console.log(`Successfully deleted objects from S3 bucket. Deleted objects:`,);
        } catch (err) {
        console.error(err);
        }
    }else if(req.body.deleteImgs && typeof req.body.deleteImgs === 'string'){
        let filename = req.body.deleteImgs.toString();
        const command = new DeleteObjectCommand({
            Bucket: 'aprendamos-a-cocinar', 
            Key:filename
        });
        try{
            const deleteObjResponse = await s3.send(command);
            console.log("RESPONSE" ,deleteObjResponse);
        }catch(err){
            console.log("error", err);
        }
    }

    // update mongo
    
    const response = Image.findByIdAndUpdate(req.params.id, {description: image.description, upvotes: image.upvotes, imgDataArr: image.imgDataArr}).then((res:any) => {
    }).catch((err:any) => {
        console.log("ERROR: ", err);
    });
    res.status(200).send(response);
});

module.exports = imageRouter;
