const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
global.__basedir = __dirname;   


require('dotenv').config();
const options = {
    key:fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem')
  }
// bring routes
const authRoutes = require('./routes/auth');

var config = require('./server-config');


// app
const app = express();
// const server = (config.useHttps? https.createServer(options, app):require('http').Server(app))
//db

mongoose
.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
.then(() => console.log('Succefully Login!'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))
// cors


app.use(cors({ origin: * }));


// routes
app.use('/api', authRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
