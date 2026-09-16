const express = require('express');
const CV = require('../models/CV');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

// Minimal XML builder just as an example of Europass structure
router.get('/:id/export/xml', async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user_id: req.user.userId });
    if (!cv) return res.status(404).json({ message: 'CV not found' });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<SkillsPassport xmlns="http://europass.cedefop.europa.eu/Europass" locale="${cv.locale || 'en'}">\n`;
    
    xml += `  <DocumentInfo>\n`;
    xml += `    <DocumentType>ECV</DocumentType>\n`;
    xml += `  </DocumentInfo>\n`;

    xml += `  <LearnerInfo>\n`;
    xml += `    <Identification>\n`;
    xml += `      <PersonName>\n`;
    xml += `        <FirstName>${cv.profile?.first_name || ''}</FirstName>\n`;
    xml += `        <Surname>${cv.profile?.last_name || ''}</Surname>\n`;
    xml += `      </PersonName>\n`;
    xml += `      <ContactInfo>\n`;
    xml += `        <Email>${cv.profile?.email || ''}</Email>\n`;
    xml += `        <TelephoneList><Telephone>${cv.profile?.phone || ''}</Telephone></TelephoneList>\n`;
    xml += `      </ContactInfo>\n`;
    xml += `    </Identification>\n`;
    
    if (cv.work_experience && cv.work_experience.length > 0) {
      xml += `    <WorkExperienceList>\n`;
      cv.work_experience.forEach(exp => {
        xml += `      <WorkExperience>\n`;
        xml += `        <Period>\n`;
        xml += `          <From>${exp.start_date}</From>\n`;
        xml += `          <To>${exp.end_date}</To>\n`;
        xml += `        </Period>\n`;
        xml += `        <Position>${exp.job_title}</Position>\n`;
        xml += `        <Employer><Name>${exp.employer}</Name></Employer>\n`;
        xml += `      </WorkExperience>\n`;
      });
      xml += `    </WorkExperienceList>\n`;
    }

    if (cv.education && cv.education.length > 0) {
      xml += `    <EducationList>\n`;
      cv.education.forEach(edu => {
        xml += `      <Education>\n`;
        xml += `        <Period>\n`;
        xml += `          <From>${edu.start_date}</From>\n`;
        xml += `          <To>${edu.end_date}</To>\n`;
        xml += `        </Period>\n`;
        xml += `        <Title>${edu.degree}</Title>\n`;
        xml += `        <Organisation><Name>${edu.institution}</Name></Organisation>\n`;
        xml += `      </Education>\n`;
      });
      xml += `    </EducationList>\n`;
    }

    xml += `  </LearnerInfo>\n`;
    xml += `</SkillsPassport>\n`;

    res.set({
      'Content-Type': 'application/xml',
      'Content-Disposition': `attachment; filename="${cv.title || 'CV'}.xml"`
    });
    res.send(xml);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
