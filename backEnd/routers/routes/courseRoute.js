const express = require("express");
const courseRoute = express.Router();

const {
  getCourses,
  newCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/course");

const {authentication} = require("../middleware/authentication")

courseRoute.get("/courses", authentication, getCourses);
courseRoute.post("/course", authentication, newCourse);
courseRoute.delete("/course/:id", deleteCourse);
courseRoute.put("/course/:id", updateCourse);

module.exports = courseRoute;
