var express = require('express');
var router = express.Router();
const {createDevice, getDevices, getDevice} = require('../controllers/deviceController');
const auth  = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.post('/', auth, checkRole("admin"), createDevice) 
router.get('/', getDevices)
router.get('/:id', getDevice)

module.exports = router;