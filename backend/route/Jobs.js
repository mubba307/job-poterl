const express = require('express');
const router = express.Router();
const Job = require('../models/job'); // If you have a separate model file

// Get all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Add a job
router.post('/', async (req, res) => {
  const { title, company } = req.body;
  const job = new Job({ title, company });
  await job.save();
  res.status(201).json(job);
});

module.exports = router;