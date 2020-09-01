const Image = require('../models/image')

exports.getIndex = (req, res) => {
    res.status(200).render('index')
}

exports.getUserImages = (req, res) => {
    res.render('./images/userImages');
}

exports.getAddPhoto = (req, res) => {
    res.status(200).render('./images/addPhoto'); 
}

exports.postAddPhoto = (req, res) => {
    const { imageName } = req.body
    const images = req.files;

    images.forEach(image => {
        const imagePath = image.path;
        const newImage = new Image({
            name: imageName,
            imagePath: imagePath,
            userID: req.user._id
        })

        newImage.save()
        .then(img => {
            imageID = img._id;
            console.log(imageID)
        })
        .catch(err => console.log(err));

    });
}