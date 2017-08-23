const express = require('express');
const path = require('path');
const router = express.Router();

const home = require('./home');
const loginSuccess = require('./loginsuccess');
const error = require('./error');


router.get('/githubinterstice', loginSuccess.get);
router.get('/loginsuccess', loginSuccess.get);
router.get('/', home);

router.use(error.client);
router.use(error.server);

module.exports = router;
