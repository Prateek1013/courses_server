const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
const mongoose = require("mongoose");
const Course = require("./Models/course");
const PORT = process.env.PORT || 4000;
const dotenv = require("dotenv").config();
const env = process.env;
app.use(cors());

MONGO_URL = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_CLUSTER}.mongodb.net/courses?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

var dat;

app.get("/courses", async (req, res) => {
  dat = await Course.find();
  console.log(dat);
  res.json(dat);
});

app.post("/course", async (req, res) => {
  let body = req.body;
  const x = await Course.create(body);
  console.log("added!");
  res.sendStatus(200);
});

app.patch("/course/:id", async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  const course = await Course.findByIdAndUpdate(id, body, { new: true });
  if (!course) {
    return res.sendStatus(404);
  }
  res.status(200).send(course);
});

app.delete("/course/:id", async (req, res) => {
  let id = req.params.id;
  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    return res.sendStatus(404);
  }
  res.status(200).send(course);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
