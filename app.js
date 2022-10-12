// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const cors = require('cors')

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
app.use(cors({
    origin: ['http://localhost:3000']
}))

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "gamer-wiki-backend";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;
const {isAuthenticated} = require('./middlewares/jwt.middleware')
// 👇 Start handling routes here
const index = require("./routes/index.routes");
const genreRoutes = require('./routes/genre.routes')
const subGenreRoutes = require('./routes/subGenre.routes')
const mainImageRoutes = require('./routes/mainImage.routes')
const producerNameRoutes = require('./routes/producerName.routes')
const developerNameRoutes = require('./routes/developerName.routes')
const releaseDateRoutes = require('./routes/releaseDate.routes')
const imagesRoutes = require('./routes/images.routes')
const contentRoutes = require('./routes/content.routes')
const authRoutes = require('./routes/auth.routes')
const checkRoutes = require('./routes/check.routes')
app.use("/", index);
app.use("/edit", isAuthenticated, genreRoutes);
app.use("/edit", isAuthenticated, subGenreRoutes)
app.use("/edit", isAuthenticated, mainImageRoutes)
app.use("/edit", isAuthenticated, producerNameRoutes)
app.use("/edit", isAuthenticated, developerNameRoutes)
app.use("/edit", isAuthenticated, releaseDateRoutes)
app.use("/edit", isAuthenticated, imagesRoutes)
app.use("/edit", isAuthenticated, contentRoutes)
app.use("/auth", authRoutes)
app.use("/check", checkRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
