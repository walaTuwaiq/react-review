require("./db/db");
const express = require("express");
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const courseRoute = require("./routers/routes/courseRoute")
app.use(courseRoute)

const signUpRoute = require("./routers/routes/signUpRoute")
app.use(signUpRoute)

const loginRoute = require("./routers/routes/loginRoute")
app.use(loginRoute)

const Port = 5000;

////////////

app.listen(Port, () => {
  console.log("SERVER IS RUN!");
});
