// server/models/projectModel.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      // <-- ADD THIS WHOLE BLOCK
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // This creates a link to the User model
    },
    title: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    description: {
      type: String,
      required: true,
    },
    teamMembers: {
      type: [String], // An array of strings
    },
    technologies: {
      type: [String],
      required: true,
    },
    githubLink: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending Approval", "Approved", "Rejected"], // Can only be one of these values
      default: "Pending Approval", // Default value when a new project is created
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
