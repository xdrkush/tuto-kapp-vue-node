// Import Module
const SmartChain = require("node-komodo-rpc"); // Module By Gcharang

// Config 
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

// Config MORTY.conf
const configMORTY = {
  rpchost: "localhost", // to put in the .env
  rpcport: 16347, // to put in the .env
  rpcuser: "user980880022", // to put in the .env
  rpcpassword: "pass8941e3b8e53a0603a22897240ccd540a90bc522b2eddd174759bed0afb195e69cf", // to put in the .env
  datadir: "/home/hsuk/.komodo/MORTY",
  name: "morty",
  conffile: "/home/hsuk/.komodo/MORTY/MORTY.conf"
};

// Config MORTY.conf
const configPIRATE = {
  rpchost: "localhost", // to put in the .env
  rpcport: 45453, // to put in the .env
  rpcuser: "user3988775008", // to put in the .env
  rpcpassword: "passc9eb245655d555af5b0557679229e7241a203ea48317090cf292c0a86e57f6a069", // to put in the .env
  datadir: "/home/hsuk/.komodo/PIRATE",
  name: "morty",
  conffile: "/home/hsuk/.komodo/PIRATE/PIRATE.conf"
};

// Default
config = configKMD

// Choose chain
exports.choose = (req, res) => {
  chooseFn(req.body)
  res.json({ success: 'Change chain !' })
}

// Edit chain
function chooseFn(choose) {
  if (choose) {
    if (choose.KOMODO === '') {
      console.log('Choose Komodo !!')
      config = configKMD
    }
    if (choose.MORTY === '') {
      console.log('Choose Morty !!')
      config = configMORTY
    }
    if (choose.PIRATE === '') {
      console.log('Choose Pirate !!')
      config = configPIRATE
    }
  }
  let komodo = new SmartChain(config);
  return komodo.rpc();
}

exports.komodoRPC = chooseFn