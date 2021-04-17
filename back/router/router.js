// Import module
const
    express = require('express'),
    router = express.Router();

// Controllers
const KappController = require('./controllers/KappController');

/*
 *     Router
 * ************** */

// Test
router.route('/test')
    .get((req, res) => {
        res.json({ msg: "backend works" })
    })

// getInfo
router.route('/getinfo')
    .get(KappController.getInfo)

// getBlockCount
router.route('/listunspent')
    .get(KappController.listUnspent)

// getBlockCount
router.route('/getwalletinfo')
    .get(KappController.getWalletInfo)

// create
router.route('/createwallet')
    .get(KappController.createwallet)

// listWallet
router.route('/listwallet')
    .get(KappController.listwallet)

// getPrivateKey
router.route('/getprivatekey')
    .post(KappController.getPrivateKkey)

// sendToTx
// router.route('/sendtotx')
//     .post(KappController.sendToTx)

// sendFromTx
router.route('/sendfromtx')
    .post(KappController.sendFromTx)

// setAccount
router.route('/setaccount')
    .post(KappController.setAccount)

// startPow
router.route('/startpow')
    .post(KappController.startPow)

// startPos
router.route('/startpos')
    .post(KappController.startPos)

// stopMining
router.route('/stopmining')
    .post(KappController.stopMining)

/* ************** *
 *  / Router
 */

module.exports = router