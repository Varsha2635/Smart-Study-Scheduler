const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount
} = require('../controllers/profileController');

const { authenticateUser } = require('../middleware/auth');

// GET /api/v1/profile - Get user profile
router.get('/profile', authenticateUser, getProfile);

// PUT /api/v1/profile - Update user profile (name and email)
router.put('/profile', authenticateUser,  updateProfile);

// PUT /api/v1/profile/password - Update password
router.put('/profile/password', authenticateUser,  updatePassword);

// DELETE /api/v1/profile - Delete user account
router.delete('/profile', authenticateUser,  deleteAccount);

module.exports = router;