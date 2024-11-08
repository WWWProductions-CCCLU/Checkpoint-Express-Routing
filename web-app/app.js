const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();

  if (
    currentDay >= 1 &&
    currentDay <= 5 &&
    currentHour >= 9 &&
    currentHour < 17
  ) {
    next();
  } else {
    res.send(
      "<h1>Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17).</h1>"
    );
  }
};

app.use(workingHoursMiddleware);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
