const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
  deleteUser
} = require('../controllers/userController')
const { protect} = require('../middleware/authMiddleware')

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get("/verify/:id/:token",verifyUser)
router.delete('/deleteuser/:id',deleteUser)
//router.post("/registercus", async (req, res) => {
  //await registerUser(req, "custemer", res);
//});
//router.post("/registerend", async (req, res) => {
  //await registerUser(req.body, "endduser", res);
//});
module.exports = router