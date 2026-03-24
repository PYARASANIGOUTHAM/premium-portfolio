const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/premiumPortfolio";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected:" + MONGO_URI))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
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