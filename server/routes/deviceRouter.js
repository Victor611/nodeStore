var express = require('express');
var router = express.Router();
const {create, getAll, getOne} = require('../controllers/deviceController');
const auth  = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.post('/', auth, checkRole("admin"), create) 
router.get('/', getAll)
router.get('/:id', getOne)

module.exports = router;