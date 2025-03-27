const express = require('express');
const { createApplication, getApplications, updateApplications, getUsersApplication, getUserExactApplication } = require('../controllers/applicationController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply',verifyToken, createApplication);

router.get('/apply',verifyAdmin, getApplications);
router.get('/apply/user', verifyToken, getUsersApplication);
router.get('/apply/user/:id',verifyToken, getUserExactApplication)
router.put('/update/:id',verifyAdmin,updateApplications)
router.get('/',(req,res)=>{
    res.send("application working fine")
})


module.exports = router;