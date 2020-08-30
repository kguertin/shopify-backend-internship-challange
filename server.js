const path = require('path');

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://kevin:node1234@cluster0.kmmuu.mongodb.net/test";

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

const imageRoutes = require('./routes/image.js');
const authRoutes = require('./routes/auth.js');

app.use(imageRoutes);
app.use(authRoutes);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
.then(() => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
})
.catch(err => console.log(err));



//sign up,
//session,
//upload image

// encrypt passwords, validation, flash error
