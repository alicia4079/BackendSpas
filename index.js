require("dotenv").config()
const cors = require('cors')
const costumerRoutes = require("./src/api/routes/costumer");
const costumersRoutes = require("./src/api/routes/costumer");
const spasRoutes = require("./src/api/routes/spa");
const usersRoutes = require("./src/api/routes/user");
const { connectDB } = require("./src/config/db")
const express = require("express")

const app = express();

app.use(express.json());

connectDB()
server.use(cors())

app.use(express.json());

app.use("/api/v1/spas", spasRoutes )
app.use("/api/v1/costumers", costumerRoutes )
app.use("/api/v1/users", usersRoutes )

app.use("*", (req, res, next) => {
  return res.status(404).json("Route Not Found");
});

app.listen(3000, () => {
  console.log("Servidor levantado en http://localhost:3000")
})