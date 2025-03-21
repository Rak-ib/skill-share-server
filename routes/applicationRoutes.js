const express = require('express');
const { createApplication, getApplications } = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply',verifyToken, createApplication);
router.get('/apply',verifyToken, getApplications);
router.get('/',(req,res)=>{
    res.send("application working fine")
})


module.exports = router;