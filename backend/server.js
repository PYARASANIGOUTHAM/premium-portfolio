require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/premiumPortfolio";

const JWT_SECRET = process.env.JWT_SECRET || 'replace-with-a-strong-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected:" + MONGO_URI))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    // process.exit(1); // Commented out to allow server to run without DB
  });

// Contact model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);


// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Admin login
const ADMIN_USER = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'password',
  name: 'Admin'
};

app.get('/admin/login', (req, res) => {
  return res.status(405).json({ message: 'Use POST to authenticate at /admin/login' });
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email !== ADMIN_USER.email || password !== ADMIN_USER.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = {
    sub: ADMIN_USER.email,
    name: ADMIN_USER.name,
    role: 'admin',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return res.status(200).json({ token, admin: { name: ADMIN_USER.name, email: ADMIN_USER.email } });
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get paginated messages
app.get('/admin/messages', authMiddleware, async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);

  try {
    const total = await Contact.countDocuments();
    const items = await Contact.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.json({ items, total });
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    return res.status(500).json({ message: 'Unable to fetch messages' });
  }
});

app.delete('/admin/messages/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return res.status(500).json({ message: 'Unable to delete message' });
  }
});

// Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    console.log("New Contact saved:", name, email, subject);

    return res.status(201).json({
      success: true,
      message: "Message received! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Error saving contact:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to submit contact right now. Please try again later.",
    });
  }
});

const requestedPort = Number(process.env.PORT) || 5000;

const startServer = (port) => {
  const serverInstance = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  serverInstance.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use. Trying port ${nextPort}...`);
      startServer(nextPort);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  });
};

startServer(requestedPort);