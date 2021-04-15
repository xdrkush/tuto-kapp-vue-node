// Import Module
const SmartChain = require("node-komodo-rpc"); // Module By Gcharang

// Config komodo.conf
const config = {
  rpchost: "localhost", // to put in the .env
  rpcport: 7771, // to put in the .env
  rpcuser: "hsukrd", // to put in the .env
  rpcpassword: "mon$uperMotDePa$$e" // to put in the .env
};

// Config Komodo rpc
const komodo = new SmartChain({ config }); // Module By Gcharang
const komodoRPC = komodo.rpc();

// List actions
module.exports = {
  getInfo: (req, res) => {
    komodoRPC
      .getinfo()
      .then(info => {
        console.log(info);
        res.json({ data: info })
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  listUnspent: (req, res) => {
    komodoRPC
      .listunspent(6, 9999999, [
        "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
        "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"
      ])
      .then(outs => {
        console.log(outs);
        res.json({ data: outs })
      })
      .catch(error => console.log(error));
  },
  getWalletInfo: (req, res) => {
    komodoRPC
      .getwalletinfo()
      .then(info => {
        console.log(info);
        res.json({ data: info })
      })
      .catch(error => {
        console.log(error);
        throw new Error(error);
      });
  },
  createwallet: (req, res) => {
    komodoRPC.getnewaddress().then(pub => {
      komodoRPC.dumpprivkey(pub).then(priv => {
        res.json({
          data: {
            public_key: pub,
            private_key: priv
          }
        })
      }).catch(error => {
        console.log(error);
        throw new Error(error);
      });
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
  }
}