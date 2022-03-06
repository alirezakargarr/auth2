const express = require("express")
const app = express()
var bodyParser = require('body-parser');
const formidable = require('express-formidable');
var session = require('express-session');

// const t = 60000 * 60
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    // maxAge: t * 6
    expires: new Date(253402300000000)
  },
  saveUninitialized: true,
  resave: true
}))
app.use(formidable());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

require("./routers")(app)

module.exports = app
