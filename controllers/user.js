
exports.getIndex = (req, res) => {
    res.status(200).render('index')
}

exports.getUserImages = (req, res) => {
    res.render('./images/userImages');
}