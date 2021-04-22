// Import Module
const SmartChain = require("node-komodo-rpc"); // Module By Gcharang

// Config komodo.conf
let config = {};

// Config komodo.conf
const configKMD = {
  rpchost: "localhost", // to put in the .env
  rpcport: 7771, // to put in the .env
  rpcuser: "hsukrd", // to put in the .env
  rpcpassword: "mon$uperMotDePa$$e", // to put in the .env
  datadir: "/home/hsuk/.komodo",
  name: "komodo",
  conffile: "/home/hsuk/.komodo/komodo.conf"
};

// Config komodo.conf
const configMORTY = {
  rpchost: "localhost", // to put in the .env
  rpcport: 16347, // to put in the .env
  rpcuser: "user980880022", // to put in the .env
  rpcpassword: "pass8941e3b8e53a0603a22897240ccd540a90bc522b2eddd174759bed0afb195e69cf", // to put in the .env
  datadir: "/home/hsuk/.komodo/MORTY",
  name: "morty",
  conffile: "/home/hsuk/.komodo/MORTY/MORTY.conf"
};

config = configKMD

console.log('config chain: ', config)

// List actions
exports.choose = (req, res) => {
  choose(req.body)
  res.json({ success: 'Its ok !' })
}

function choose(choose) {
  if (choose.KOMODO === '') {
    console.log('Choose Komodo !!')
    config = configKMD
  }
  if (choose.MORTY === '') {
    console.log('Choose Morty !!')
    config = configMORTY
  }
}

// Config Komodo rpc
const komodo = new SmartChain(config); // Module By Gcharang
const komodoRPC = komodo.rpc();

console.log(komodoRPC)

exports.komodoRPC = komodoRPC