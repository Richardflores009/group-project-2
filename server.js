const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/config");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

app.use(routes);

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
//   sequelize.sync({ force: false });
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
