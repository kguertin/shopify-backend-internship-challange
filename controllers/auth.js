const User = require('../models/user');

exports.getLogin = (req, res) => {
    res.status(200).render('./auth/login', {
        pageTitle: 'Login'
    });
}

exports.postLogin = (req, res) => {
    const { username, password } = req.body
    User.findOne({username: username})
        .then(user => {
            if(!user){
                return res.redirect('./login');
            }
            if(user.password !== password){
                return res.redirect('./login');
            }

            req.session.user = user;
            req.session.isLoggedIn = true;
            
            return req.session.save((err) => {
                if(err){
                    console.log(err);
                }
                res.redirect('/userImages');
              })
        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
        res.redirect('/')
    })
}

exports.getSignUp = (req, res) => {
    res.status(200).render('./auth/signup', {
        pageTitle: 'Signup'
    })
}

exports.postSignUp = (req, res) => {
    const { username, password, confirmPassword } = req.body;

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