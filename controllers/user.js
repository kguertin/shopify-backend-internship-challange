const fs = require('fs');
const path = require('path')

const decompress = require('decompress');
const unzipper = require('unzipper');

const Image = require('../models/image');
const User = require('../models/user');
const user = require('../models/user');

exports.getIndex = (req, res) => {
    Image.find({status: 'public'})
    .populate('userID')
        .then(images => {
            res.status(200).render('index', {
                pageTitle: 'Home',
                imageData: images,

            })
        })
        .catch(err => console.log(err))
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
                    console.log(imageData)
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

    exports.getEditImage = (req, res) => {
        const imageId = req.query.imageId
        Image.findOne({_id: imageId})
            .then(image => {
                console.log(image)
              res.render('./images/editImage', {
                  pageTitle: 'Edit Image',
                  imageData: image
              }) 
            })
            .catch(err => console.log(err))

    }

    exports.postEditImage = async (req, res) => {
        const { filename, description, status, imageId } = req.body;
        console.log(imageId);
        const updatedImage = await Image.findOneAndUpdate({_id: imageId}, {
            name: filename, 
            description: description,
            status: status
        });
        updatedImage.save();

        res.redirect('/manageUserImages');
    }

    exports.postBulkOperation = (req, res) => {
        let imagesToUpdate = req.body['checkBoxArray[]'];
        if (typeof imagesToUpdate === 'string') imagesToUpdate = [imagesToUpdate]
        const { operation } =  req.body;
        const userId = req.user;

        if(operation === 'public') {
            imagesToUpdate.forEach(async id => {
                const updatedImages = await Image.findOneAndUpdate({_id: id}, {status: 'public'});
                updatedImages.save();
            })
            return res.redirect('/manageUserImages');
        }
        
        if(operation === 'private') {
             imagesToUpdate.forEach(async id => {
                const updatedImages = await Image.findOneAndUpdate({_id: id}, {status: 'private'});
                updatedImages.save();
            })
            return res.redirect('/manageUserImages');
        }

        if(operation === 'delete'){
            imagesToUpdate.forEach(async id => {
                const updatedImages = await Image.findByIdAndDelete(id);
                updatedImages.save();
            })
            return res.redirect('/manageUserImages');
        }
    }
