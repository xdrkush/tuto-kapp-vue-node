// Import module
const
    express = require('express'),
    router = express.Router();

// Controllers
const KappController = require('./controllers/KappController'),
    ZappController = require('./controllers/ZappController'),
    ChooseChainController = require('./controllers/ChooseChainController');

/*
 *     Router
 * ************** */

// Test
router.route('/test')
    .get((req, res) => {
        res.json({ msg: "backend works" })
    })

// Chain Available
router.route('/chainavailable')
    .get(ChooseChainController.chainAvailable)

// Chain Available
router.route('/runchain')
    .post(ChooseChainController.runChain)

// getInfo
router.route('/getinfo')
    .get(KappController.getInfo)

// listunspent
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

// sendFromTx
router.route('/sendfromtx')
    .post(KappController.sendFromTx)

// setAccount
router.route('/setaccount')
    .post(KappController.setAccount)

// miningInfo
router.route('/mininginfo')
    .get(KappController.miningInfo)

// getAddressBalance
router.route('/getaddressbalance')
    .post(KappController.getAddressBalance)

// getAddressBalance
router.route('/choosechain')
    .post(ChooseChainController.choose)

/*
 * Z Concept
 * ********* */

// Get Total Balance
router.route('/gettotalbalance')
    .get(ZappController.getTotalBalance)

// get list wallet Z
router.route('/zlistaddresses')
    .get(ZappController.getListZAddress)

// create wallet Z
router.route('/createwalletz')
    .get(ZappController.createWalletZ)

// getZAddressBalance
router.route('/getzaddressbalance')
    .post(ZappController.getZAddressBalance)

// z_sendMany
router.route('/zsendmany')
    .post(ZappController.zSendMany)

// z_getZOperationId
router.route('/getzopid')
    .get(ZappController.getZOpId)

router.route('/zexportkey')
    .post(ZappController.getZPrivateKkey)

/* ************** *
 *  / Router
 */

module.exports = router