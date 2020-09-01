const Image = require('../models/image')
const User = require('../models/user')

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
    
}

exports.getAddPhoto = (req, res) => {
    res.status(200).render('./images/addPhoto', {
        pageTitle: "Add Photo"
    }); 
}

exports.postAddPhoto = async (req, res) => {
    try {
    const images = req.files;
    images.forEach( async image => {
        const imagePath = image.path;
        const newImage = new Image({
            name: image.originalname.split('.')[0],
            imagePath: imagePath,
            userID: req.user._id
        })

        const savedImage = await newImage.save()
    });

    res.status(200).redirect('./userImages');
    } catch(err){
        console.log(err);
    }
}