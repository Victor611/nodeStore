var express = require('express');
var router = express.Router();

const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');

/* Prefix Api */

router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)

module.exports = router;