const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const cvRoutes = require('./routes/cv');
const exportRoutes = require('./routes/export');
const xmlExportRoutes = require('./routes/xmlExport');

app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/cv', exportRoutes);
app.use('/api/cv', xmlExportRoutes);

app.get('/', (req, res) => {
  res.send('ATS CV Builder API is running');
});

const https = require('https');

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Keep-alive ping for Render
    const url = process.env.RENDER_EXTERNAL_URL || 'https://ats-cv-builder.onrender.com/';
    if (url) {
      setInterval(() => {
        https.get(url, (res) => {
          console.log(`Keep-alive ping: ${res.statusCode}`);
        }).on('error', (err) => {
          console.error(`Keep-alive ping error: ${err.message}`);
        });
      }, 10 * 60 * 1000); // 10 minutes
    } else {
      console.log('RENDER_EXTERNAL_URL is not set. Keep-alive ping is disabled.');
    }
  });
})
.catch(err => console.error('MongoDB connection error:', err));
