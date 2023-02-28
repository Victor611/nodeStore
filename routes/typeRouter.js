var express = require('express');
var router = express.Router();
const {create, getTypes} = require('../controllers/typeController');
const auth  = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.post('/', auth, checkRole("admin"), create) 
router.get('/', getTypes)

module.exports = router;