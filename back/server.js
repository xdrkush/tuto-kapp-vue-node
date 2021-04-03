/*
 *    Komodo
 * ************* */

// const SmartChain = require("node-komodo-rpc"); // Module By Gcharang

require('dotenv').config()

const config = {
  rpchost: "localhost", // to put in the .env
  rpcport: 7771, // to put in the .env
  rpcuser: "hsukrd", // to put in the .env
  rpcpassword: "mon$uperMotDePa$$e" // to put in the .env
};

// const komodo = new SmartChain({ config }); // Module By Gcharang
// const komodoRPC = komodo.rpc();

// console.log(komodo.config); // Prints the config being used by the komodo instance

// uncomment for log
// komodoRPC
//   .getinfo()
//   .then(info => {
//     console.log(info);
//   })
//   .catch(error => {
//     console.log(error);
//     throw new Error(error);
//   });

// uncomment for log
// komodoRPC
//   .getblockcount()
//   .then(info => {
//     console.log('getblockcount', info);
//   })
//   .catch(error => {
//     console.log(error);
//     throw new Error(error);
//   });

// uncomment for log
// komodoRPC
//   .listunspent(6, 9999999, [
//     "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
//     "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"
//   ])
//   .then(outs => {
//     console.log(outs);
//   })
//   .catch(error => console.log(error));

/*
 *    Server
 * ************* */ 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors (from front-end application)
app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET'],
  credentials: true
}))

module.exports = {
  config
}

// Router HTTP
const ROUTER = require('./router/router')
app.use('/api', ROUTER)


const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Server running on port ${port}`));
