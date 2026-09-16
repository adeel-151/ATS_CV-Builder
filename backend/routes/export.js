const express = require('express');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');
const CV = require('../models/CV');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/:id/export/pdf', async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user_id: req.user.userId });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    // Render HTML using EJS
    const templatePath = path.join(__dirname, '../views/cv-template.ejs');
    const html = await ejs.renderFile(templatePath, { cv });

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${cv.title || 'CV'}.pdf"`,
      'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
