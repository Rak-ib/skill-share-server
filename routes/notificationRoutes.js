const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getNotification, updateNotification } = require('../controllers/notificationController');
const router=express.Router();



router.get('/notification',verifyToken,getNotification);
router.patch('/notification',verifyToken,updateNotification)

module.exports=router