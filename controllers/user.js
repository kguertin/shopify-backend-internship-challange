const fs = require('fs');
const path = require('path')

const decompress = require('decompress');
const unzipper = require('unzipper');

const Image = require('../models/image');
const User = require('../models/user');
const { Z_FIXED } = require('zlib');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');

exports.getIndex = (req, res) => {
    res.status(200).render('index', {
        pageTitle: 'Home'
    })
}

exports.getUserImages = (req, res) => {
    Image.find({userID : req.user._id})
        .then(img => {
            res.status(200).render('./images/userImages', {
                pageTitle: "User Images",
                images: img
            })
        })
        .catch(err => console.log(err)) 
}

exports.getUserImage = (req, res) => {
    const {imageId } = req.params;
    
    Image.findById(imageId)
        .then(image => {
            res.status(200).render('./images/image', {
                pageTitle: image.name,
                imageData: image
            })
        })
        .catch(err => console.log(err));
}

exports.getAddPhoto = (req, res) => {
    res.status(200).render('./images/addPhoto', {
        pageTitle: "Add Photo"
    }); 
}

exports.postAddPhoto = async (req, res) => {
    try {
    const images = req.files;
    console.log(images)

    images.forEach( async image => {

        if (image.mimetype === 'application/x-zip-compressed'){
            const zippedFiles = await decompress(image.path, 'images', {
                map: file => {
                    file.path =  `${Date.now()}_${file.path.split('/')[1]}`
                    return file
                }
            })
            zippedFiles.forEach(async file => {
                const fileName = file.path.split('_')[1].split('.')[0];
                const newImage = new Image({
                    name: fileName,
                    imagePath: path.join('images',file.path),
                    userID: req.user._id
                })
                const savedImage = await newImage.save();
            })
            return
        }

        const imagePath = image.path;
        const newImage = new Image({
            name: image.originalname.split('.')[0],
            imagePath: imagePath,
            userID: req.user._id
        })

        const savedImage = await newImage.save()
    });

    return res.status(200).redirect('./userImages');
    } catch(err){
        console.log(err);
    }
}

exports.getManageImages = (req, res) => {
    Image.find({userID: req.user._id})
        .then(imageData => {
            res.status(200).render('./images/manageUserImages', {
                pageTitle: 'Manage Images',
                imageData: imageData
            });
        }) 
    }

    exports.postUpdateStatus = (req, res) => {
        const { imageID } = req.body;
        Image.find({_id: imageID})
            .then(image => {
                const updatedImage = image[0];
                if(updatedImage.status === 'private'){
                    updatedImage.status = 'public'

                } else {
                    updatedImage.status = 'private'
                }
                updatedImage.save()
            })
            .catch(err => console.log(err))

            Image.find({userID: req.user._id})
                .then(imageData => {
                    return res.status(200).render('./images/manageUserImages', {
                        pageTitle: 'Manage Images',
                        imageData: imageData
                    });
                })
                .catch(err => console.log(err))
    }

    exports.postDeleteImage = (req, res) => {
        const { imageID } = req.body;
        Image.findById(imageID)
            .then(image => {
                fs.unlink(image.imagePath, err => {
                    console.log(err);
                })
                return Image.deleteOne({
                    _id: imageID,
                    userID: req.user._id
                })
            })
            .then(() => {
                Image.find({userID: req.user._id})
                    .then(imageData => {
                        return res.status(200).render('./images/manageUserImages', {
                            pageTitle: 'Manage Images',
                            imageData: imageData
                        });
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
