const express = require('express');
const { createApplication, getApplications, updateApplications } = require('../controllers/applicationController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply',verifyToken, createApplication);
router.get('/apply',verifyToken, getApplications);
router.put('/update/:id',verifyAdmin,updateApplications)
router.get('/',(req,res)=>{
    res.send("application working fine")
})


module.exports = router;