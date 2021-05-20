// Import Module
const SmartChain = require("node-komodo-rpc"); // Module By Gcharang
const connectChain = require('../../config/chooseChain.json');
const runChain = require('../../config/runChain.json');
const { exec } = require("child_process");

// Config 
let config = {};

// Choose chain
exports.choose = (req, res) => {
  chooseFn(req.body)
  res.json({ success: 'Change chain !' })
}

// List chains for the front (../../config/chooseChain.json)
// And Status (run or stop) (in progress)
exports.chainAvailable = (req, res) => {
  let chainAv = []
  connectChain.forEach(chain => chainAv.push(chain.name))
  res.status(200).json({ message: 'Chain is available !', chain: chainAv })
}

// Run chain (../../config/runChain.json)
exports.runChain = (req, res) => {
  console.log('run chain: ', req.body)
  runChain.forEach(chain => {
    if (req.body.choose === chain.name) {
      exec(chain.command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    } else return
  })
  res.end()
}

exports.stopChain = (req, res) => {
  console.log('Stop Chain')
}

// Edit chain
function chooseFn(choose) {
  if (choose) {
    connectChain.forEach(chain => {
      if (choose.choose === chain.name) config = chain
      else return
    })
  }
  let komodo = new SmartChain(config);
  return komodo.rpc();
}

exports.komodoRPC = chooseFn