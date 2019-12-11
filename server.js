require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const cors = require('cors')
const app = express();

app.use(express.urlencoded( { extended: false }));
app.use(express.json());
app.use(helmet())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.once('open', () => {
    console.log(`connected to mongo db on ${db.host}:${db.port}... `)
})

db.on('error', (err) => {
    console.log(`database error:\n${err}`)
})

app.use('/auth', require('./routes/auth'))
app.use('/api', expressJWT({ secret: process.env.JWT_SECRET }), require('./routes/api'));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`)

})