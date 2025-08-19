// server/routes/projects.js

const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");
const { protect } = require("../middleware/authMiddleware"); 


// DEFINE API ROUTES

// @route   GET /api/projects
// @desc    Get all approved projects
// @access  Public
router.get("/",async (req, res) => {
  try {
    // Find all projects that have the status 'Approved'
    const projects = await Project.find({ status: "Approved" });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private (will be protected later)
router.post('/',protect, async (req, res) => {
  // Destructure the expected fields from the request body
  const { title, description, teamMembers, technologies, githubLink, youtubeLink } = req.body;

  try {
    // Create a new project instance using our Mongoose model
    const newProject = new Project({
      title,
      description,
      teamMembers,
      technologies,
      githubLink,
      youtubeLink,
      user: req.user.id
      // The 'status' will default to 'Pending Approval' as defined in our schema
    });

    // Save the new project to the database
    const project = await newProject.save();

    // Respond with the newly created project
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "user",
      "name email"
    ); // <-- This is new!

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // We only want to show approved projects publicly
    if (project.status !== "Approved") {
      return res
        .status(403)
        .json({ msg: "This project has not been approved yet" });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
