require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = "mongodb+srv://kevin:node1234@cluster0.kmmuu.mongodb.net/test";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
})
.catch(err => console.log(err));
