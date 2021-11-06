var express = require('express');
var router = express.Router();

const {getAll, getOne} = require('../controllers/userController');
const auth = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.get('/', auth, checkRole("admin"), getAll)
router.get('/:id', auth, getOne)

module.exports = router;