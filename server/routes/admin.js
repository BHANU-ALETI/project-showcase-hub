// server/routes/admin.js
const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");
const { protect, admin } = require("../middleware/authMiddleware");

// @route   GET /api/admin/pending
// @desc    Get all projects pending approval
// @access  Private (Admin)
router.get("/pending", protect, admin, async (req, res) => {
  try {
    const pendingProjects = await Project.find({ status: "Pending Approval" });
    res.json(pendingProjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/admin/projects/:id/status
// @desc    Update a project's status (approve/reject)
// @access  Private (Admin)
router.put("/projects/:id/status",protect,admin, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // Simple validation for the status
  if (status !== "Approved" && status !== "Rejected") {
    return res.status(400).json({ msg: "Invalid status update" });
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { status }, // Field to update
      { new: true } // Option to return the updated document
    );

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
