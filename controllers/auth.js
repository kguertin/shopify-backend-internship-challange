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
        .then(user => {
            if(user.length){
               return res.redirect('./login');
            }

            if(password !== confirmPassword){
                return res.redirect('./login');
            }

            const newUser = new User({
                username,
                password
            })

            return newUser.save();
        })
        .then(() => res.status(200).redirect('/'))
        .catch(err => console.log(err));

}