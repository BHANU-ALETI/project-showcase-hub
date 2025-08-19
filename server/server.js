// 1. Import Express
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // <-- Import DB connection
const adminRoutes = require("./routes/admin"); 
const userRoutes = require("./routes/users");
require("dotenv").config();

connectDB();

// Import routes
const projectRoutes = require('./routes/projects');

// 2. Create an instance of an Express application
const app = express();

// 3. APPLY MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3. Define the port the server will run on
// Use the environment variable PORT if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;

app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/users", userRoutes);

// 5. Start the server and listen for incoming connections
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
