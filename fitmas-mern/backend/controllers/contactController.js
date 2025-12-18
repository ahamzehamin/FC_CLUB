const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create contact message
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Send email notification (optional)
    if (process.env.NODE_ENV === 'production') {
      // Configure nodemailer
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'admin@fitmas.com',
        subject: `New Contact Form Submission - ${contact.subject}`,
        html: `
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contact.message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact message sent successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all contact messages (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single contact message
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, {
      new: true,
      runValidators: true
    });
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete contact message
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
