const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://keta:keta123@blog-app.dka7x.mongodb.net/myBlog?retryWrites=true&w=majority'

const port = 3000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(port))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// let filePath = path.join(__dirname, 'files', 'app.html');
// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// Error page
app.use((req, res) => {
  res.status(404).render("404", { title: '404' });
});