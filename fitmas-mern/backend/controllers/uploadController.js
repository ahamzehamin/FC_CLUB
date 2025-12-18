const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    cb(null, `${basename}-${uniqueSuffix}${extension}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files at once
  },
  fileFilter: fileFilter
});

// Single file upload
const uploadSingle = upload.single('file');

// Multiple files upload
const uploadMultiple = upload.array('files', 10);

// Handle single file upload
const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Create file URL
    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'File upload failed'
    });
  }
};

// Handle multiple files upload
const uploadFiles = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));

    res.json({
      success: true,
      message: `${req.files.length} files uploaded successfully`,
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'File upload failed'
    });
  }
};

// Delete file
const deleteFile = (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: 'Filename is required'
      });
    }

    const filePath = path.join(uploadDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'File deletion failed'
    });
  }
};

// Get file info
const getFileInfo = (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: 'Filename is required'
      });
    }

    const filePath = path.join(uploadDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Get file stats
    const stats = fs.statSync(filePath);

    res.json({
      success: true,
      data: {
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        url: `/uploads/${filename}`
      }
    });
  } catch (error) {
    console.error('Get file info error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get file info'
    });
  }
};

// List uploaded files
const listFiles = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Read directory
    let files = fs.readdirSync(uploadDir);

    // Filter out directories
    files = files.filter(file => {
      const filePath = path.join(uploadDir, file);
      return fs.statSync(filePath).isFile();
    });

    // Sort by creation time (newest first)
    files.sort((a, b) => {
      const statA = fs.statSync(path.join(uploadDir, a));
      const statB = fs.statSync(path.join(uploadDir, b));
      return statB.birthtime - statA.birthtime;
    });

    // Paginate
    const totalFiles = files.length;
    const paginatedFiles = files.slice(skip, skip + limit);

    // Get file details
    const fileDetails = paginatedFiles.map(filename => {
      const filePath = path.join(uploadDir, filename);
      const stats = fs.statSync(filePath);

      return {
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        url: `/uploads/${filename}`
      };
    });

    res.json({
      success: true,
      data: fileDetails,
      pagination: {
        page,
        limit,
        total: totalFiles,
        pages: Math.ceil(totalFiles / limit)
      }
    });
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to list files'
    });
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadFile,
  uploadFiles,
  deleteFile,
  getFileInfo,
  listFiles
};
