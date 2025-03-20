const express = require('express');
const {  createUser, loginUser, logoutUser, getUserProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);
router.get('/logout', logoutUser);
router.get("/me", verifyToken, getUserProfile);
router.get('/',(req,res)=>{
    console.log('okay')
    res.send('users is running');
    
})

module.exports = router;