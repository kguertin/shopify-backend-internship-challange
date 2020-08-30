
exports.getLogin = (req, res) => {
    res.status(200).render('./auth/login');
}

exports.getSignUp = (req, res) => {
    res.status(200).render('./auth/signup')
}