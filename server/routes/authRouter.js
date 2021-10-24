var express = require('express');
var router = express.Router();
const { registration, login, check } = require('../controllers/authController');
const authMiddleweare = require('../middleweare/authMiddleweare')

router.post('/registration', registration) 
router.post('/login', login)
router.get('/check', authMiddleweare, check)

module.exports = router;