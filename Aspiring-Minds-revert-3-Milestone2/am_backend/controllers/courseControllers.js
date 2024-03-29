const asyncWrapper = require("../middleware/asyncWrapper");
const bcrypt = require("bcryptjs");
const Course = require("../model/course");

const createCourse = asyncWrapper(async (req, res) => {
  const { title, author, rating, price, modules } = req.body;

  const newCourse = new Course({ title, author, rating, price, modules });

  newCourse
    .save()
    .then((savedCourse) => {
      res.status(200).json({ course: savedCourse });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save the course" });
    });
});

const getCourses = asyncWrapper((req, res) => {
  Course.find()
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch courses" });
    });
});

const getCourseById = asyncWrapper((req, res) => {
  const courseId = req.params.id;

  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.status(200).json(course);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch the course" });
    });
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
};
