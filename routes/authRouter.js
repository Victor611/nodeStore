var express = require('express');
var router = express.Router();
const { registration, login, logout, activate, resendActivate } = require('../controllers/authController');
const auth = require('../middleweare/authMiddleweare')

router.post('/registration/:role(user|admin)/:provider(email|phone|google|facebook)', registration)

router.post('/login/:provider(email, phone, google, facebook)', login)

router.post('/logout', auth, logout)

router.get('/activate/:provider(email|phone)/:link', activate)

router.post('/resend/activate/:provider(email|phone)', resendActivate)


module.exports = router;