
exports.getTotalBalance = (req, res) => {
  require('./ChooseChainController').komodoRPC()
    .z_gettotalbalance()
    .then(bal => {
      // console.log('GetTotalBalance: ', bal)
      res.json({
        data: bal
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

exports.getListZAddress = (req, res) => {
  require('./ChooseChainController').komodoRPC()
    .z_listaddresses()
    .then(addr => {
      // console.log('getListZAdress: ', addr)
      let addresses = []
      addr.forEach(i => addresses.push({ address: i }));
      res.json({
        data: addresses
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

exports.createWalletZ = (req, res) => {
  require('./ChooseChainController').komodoRPC().z_getnewaddress().then(pub => {
    require('./ChooseChainController').komodoRPC().z_exportkey(pub).then(priv => {
      // console.log('createWalletZ: ', { public_key: pub, private_key: priv })
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

exports.getZAddressBalance = (req, res) => {
  require('./ChooseChainController').komodoRPC()
    .z_getbalance(req.body.address)
    .then(bal => {
      // console.log('getZAddressBalance: ', bal)
      res.json({
        data: bal
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

// exports.zSendMany = (req, res) => {
//   require('./ChooseChainController').komodoRPC()
//   // .sendmany(req.body.from, [{address: req.body.to, amount: req.body.amount}])
//   .z_sendmany("zs17x4y4m7n2l9anqkscychpfj39p4xrm7fc7w78j8vx843klcsxzyl6dwu70zekn99n5dwcu2tv4p", [{address: "zs1v0v5alustuvf46gxut3rredee8f83trtszxc0gk77qgaw5mwuchnndan64jzv6u8jkpdxy5qqy7", amount: "0.0011"}])
//   .then(tx => {
//       console.log('OP_ID sendmany: ', tx)
//       res.json({
//         data: {
//           success: "Success ! Your transaction_id.",
//           txId: tx
//         }
//       })
//     }).catch(error => {
//       console.log(error);
//       throw new Error(error);
//     });
// }

exports.zSendMany = (req, res) => {
  require('./ChooseChainController').komodoRPC()
    .z_sendmany(req.body.addr_from, [{ address: req.body.addr_to, amount: req.body.amount }]).then(op => {
      // console.log('zSendMany: ', op)
      res.json({
        data: {
          success: "Success ! Your transaction_id.",
          txId: op
        }
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

exports.getZPrivateKkey = (req, res) => {
  console.log(req.body)
  require('./ChooseChainController').komodoRPC()
    .z_exportkey(req.body.public_key)
    .then(priv => {
      // console.log('getZPrivatKey: ', priv)
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

exports.getZOpId = (req, res) => {
  require('./ChooseChainController').komodoRPC()
    .z_getoperationresult([req.body.zOpId])
    .then(op => {
      // console.log('getZOpId: ', op)
      res.json({
        data: {
          success: "Success ! Your transaction_id.",
          txId: op
        }
      })
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
}
