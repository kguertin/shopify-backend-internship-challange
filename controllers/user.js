const Image = require('../models/image')
const User = require('../models/user')

exports.getIndex = (req, res) => {
    res.status(200).render('index')
}

exports.getUserImages = (req, res) => {
    res.render('./images/userImages');
}

exports.getAddPhoto = (req, res) => {
    res.status(200).render('./images/addPhoto'); 
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