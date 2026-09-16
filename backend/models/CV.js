const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled CV' },
  locale: { type: String, default: 'en' },
  is_public: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  
  // Profile Information
  profile: {
    first_name: String,
    last_name: String,
    photo_url: String,
    date_of_birth: String,
    gender: String,
    nationality: String,
    address: String,
    city: String,
    country: String,
    email: String,
    phone: String,
    title: String,
  },

  // Work Experience
  work_experience: [{
    job_title: String,
    employer: String,
    city: String,
    country: String,
    start_date: String,
    end_date: String,
    currently_working: Boolean,
    activities: String
  }],

  // Education
  education: [{
    degree: String,
    institution: String,
    city: String,
    country: String,
    start_date: String,
    end_date: String,
    level: String, // e.g. EQF level
    field: String,
    activities: String
  }],

  // Languages
  language_skills: {
    mother_tongue: String,
    other_languages: [{
      language: String,
      proficiency_listening: String,
      proficiency_reading: String,
      proficiency_spoken: String,
      proficiency_written: String
    }]
  },

  // Other Skills
  skills: [{
    category: String,
    description: String,
    proficiency: String
  }],

  // Achievements
  achievements: [{
    description: String
  }]
});

module.exports = mongoose.model('CV', cvSchema);
