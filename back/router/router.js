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

/* ************** *
 *  / Router
 */

module.exports = router