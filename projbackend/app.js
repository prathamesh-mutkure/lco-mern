require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;
const app = express();

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DB CONNECTED")
    }).catch((err) => {
        console.log(`ERR: ${err}`)
    })

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
