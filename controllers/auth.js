const User = require('../models/user');

exports.getLogin = (req, res) => {
    res.status(200).render('./auth/login');
}

exports.getSignUp = (req, res) => {
    res.status(200).render('./auth/signup')
}

exports.postSignUp = (req, res) => {
    const {username, password, confirmPassword} = req.body;

    User.find({username: username})
        .then(res => console.log(res))
        .catch(err => console.log(err));

}