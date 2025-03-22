const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getNotification } = require('../controllers/notificationController');
const router=express.Router();



router.get('/notification',verifyToken,getNotification);

module.exports=router