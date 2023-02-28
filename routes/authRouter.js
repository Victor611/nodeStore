var express = require('express');
var router = express.Router();
const { registration, login, logout, activate, resendActivate, refresh } = require('../controllers/authController');
const auth = require('../middleweare/authMiddleweare');
const checkRole = require('../middleweare/checkRoleMiddleweare');

router.post('/registration/:role(user)/:provider(email|phone|google|facebook)', registration)

router.post('/registration/:role(admin)/:provider(email|phone)', auth, checkRole("SA"), registration)

router.get('/activate/:provider(email|phone)/:link', activate)

router.post('/resend/activate/:provider(email|phone)', resendActivate)

router.post('/login/:provider(email|phone|google|facebook)', login)

router.get('/logout', auth, logout)

router.get('/refresh', refresh)

module.exports = router;