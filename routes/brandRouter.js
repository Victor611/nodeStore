var express = require('express');
var router = express.Router();
const {create, getBrands} = require('../controllers/brandController');
const auth  = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.get('/', getBrands)
router.post('/', auth, checkRole("admin"), create) 

module.exports = router;