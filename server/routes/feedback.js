const express = require('express');
const { emailFeedback } = require('../controllers/feedback');
const router = express.Router();
// const emailFeedback = require('../controllers/emailFeedback')

router.post('/feedback', emailFeedback);

module.exports = router;