const express = require('express');
const {
  uploadSingle,
  uploadMultiple,
  uploadFile,
  uploadFiles,
  deleteFile,
  getFileInfo,
  listFiles
} = require('../controllers/uploadController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// Single file upload
router.post('/single', uploadSingle, uploadFile);

// Multiple files upload
router.post('/multiple', uploadMultiple, uploadFiles);

// Get list of uploaded files
router.get('/', listFiles);

// Get specific file info
router.get('/:filename/info', getFileInfo);

// Delete file
router.delete('/:filename', deleteFile);

module.exports = router;
