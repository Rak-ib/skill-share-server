const express = require('express');
const { createApplication, getApplications } = require('../controllers/applicationController');

const router = express.Router();

router.post('/apply', createApplication);
router.get('/apply', getApplications);


module.exports = router;