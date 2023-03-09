const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
  deleteUser,
  fetchalluser,
  countallusers,
  countcustemerusers
} = require('../controllers/userController')
const { protect,isAdmin} = require('../middleware/authMiddleware')

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/allusers', protect,isAdmin, fetchalluser)
router.get("/verify/:id/:token",verifyUser)
router.delete('/deleteuser/:id',deleteUser)
router.get('/countusers', protect,isAdmin,countallusers )
router.get('/countcustemerusers', protect,isAdmin,   countcustemerusers)
//router.post("/registercus", async (req, res) => {
  //await registerUser(req, "custemer", res);
//});
//router.post("/registerend", async (req, res) => {
  //await registerUser(req.body, "endduser", res);
//});
module.exports = router