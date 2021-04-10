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

/* ************** *
 *  / Router
 */

module.exports = router