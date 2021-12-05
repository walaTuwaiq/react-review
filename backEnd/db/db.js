const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/coursesReactReviewDB").then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);
