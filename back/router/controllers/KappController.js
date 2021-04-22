const komodoRPC = require('./ChooseChainController').komodoRPC

// console.log(komodoRPC.getinfo()
//   .then(info => {
//     console.log(info);
//   })
//   .catch(error => {
//     console.log(error);
//     throw new Error(error);
//   })
// )

// List actions
exports.getInfo = (req, res) => {
  komodoRPC
    .getinfo()
    .then(info => {
      // console.log(info);
      res.json({ data: info })
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

exports.listUnspent = (req, res) => {
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
}

exports.getWalletInfo = (req, res) => {
  komodoRPC
    .getwalletinfo()
    .then(info => {
      // console.log(info);
      res.json({ data: info })
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

exports.createwallet = (req, res) => {
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

exports.listwallet = (req, res) => {
  komodoRPC
    .listreceivedbyaddress(1, true)
    .then(info => {
      // console.log(info);
      res.json({ data: info })
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

exports.getPrivateKkey = (req, res) => {
  komodoRPC.dumpprivkey(req.body.public_key).then(priv => {
    res.json({
      data: {
        private_key: priv
      }
    })
  }).catch(error => {
    console.log(error);
    throw new Error(error);
  });
}

// sendToTx: (req, res) => {
//   console.log(req.body)
//   komodoRPC.sendtoaddress(req.body.to, req.body.amount).then(tx => {
//     console.log(tx)
//     res.json({
//       data: {
//         success: "Success !"
//       }
//     })
//   }).catch(error => {
//     console.log(error);
//     throw new Error(error);
//   });
// }

exports.sendFromTx = (req, res) => {
  komodoRPC.sendfrom(req.body.accountFrom, req.body.to, req.body.amount).then(tx => {
    console.log(tx)
    res.json({
      data: {
        success: "Success ! Your transaction_id.",
        txId: tx
      }
    })
  }).catch(error => {
    console.log(error);
    throw new Error(error);
  });
}

exports.setAccount = (req, res) => {
  komodoRPC.setaccount(req.body.address_pub, req.body.account).then(set => {
    res.json({
      data: {
        success: "Success !"
      }
    })
  }).catch(error => {
    console.log(error);
    throw new Error(error);
  });
}

exports.startPow = (req, res) => {
  console.log('Start mining Pow')
}

exports.startPos = (req, res) => {
  console.log('Start mining Pos')
}

exports.miningInfo = (req, res) => {
  komodoRPC
    .getmininginfo()
    .then(info => {
      // console.log(info)
      res.json({
        data: info
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

exports.stopMining = (req, res) => {
  console.log('Stop mining')
}

exports.getAddressBalance = (req, res) => {
  komodoRPC
    .getaddressbalance({ addresses: [req.body.address] })
    .then(bal => {
      console.log(bal)
      res.json({
        data: bal
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
}