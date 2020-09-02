const Image = require('../models/image')
const User = require('../models/user')
const user = require('../models/user')

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
        console.log(image)
        const imagePath = image.path;
        const newImage = new Image({
            name: image.originalname.split('.')[0],
            imagePath: imagePath,
            imageSize: image.size,
            userID: req.user._id
        })

        const savedImage = await newImage.save()
    });

    res.status(200).redirect('./userImages');
    } catch(err){
        console.log(err);
    }
}

exports.getManageImages = (req, res) => {
    Image.find({_id: req.user._id})
        .then(imageData => {
            res.status(200).render('./images/manageUserImages', {
                pageTitle: 'Manage Images',
                imageData: imageData
            });
        }) 
    }
