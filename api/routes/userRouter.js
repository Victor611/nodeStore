var express = require('express');
var router = express.Router();

const {getAll, getUsers, getUser} = require('../controllers/userController');
const auth = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.get('/', auth, checkRole("admin"), getUsers)
router.get('/:id', auth, getUser)

module.exports = router;