/*
 *  KApp Server
 * ************* */

const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config()

// Parsing data from http method
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors (from front-end application)
app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET'],
  credentials: true
}))

// Router HTTP
const ROUTER = require('./router/router')
app.use('/api', ROUTER)

// Run server
const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Server running on port ${port}`));
