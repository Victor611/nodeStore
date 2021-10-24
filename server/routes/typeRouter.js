var express = require('express');
var router = express.Router();
const {create, getAll} = require('../controllers/typeController');
const auth  = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.post('/', auth, checkRole("admin"), create) 
router.get('/', getAll)

module.exports = router;