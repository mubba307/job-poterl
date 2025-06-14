const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://smubbashir35:<db_password>@cluster0.euoq7my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Job Schema & Model
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
});
const Job = mongoose.model('Job', jobSchema);

// Example route: Get all jobs
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Example route: Add a job
app.post('/api/jobs', async (req, res) => {
  const { title, company } = req.body;
  const job = new Job({ title, company });
  await job.save();
  res.status(201).json(job);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});