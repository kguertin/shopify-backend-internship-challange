
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
    console.log(images);
}