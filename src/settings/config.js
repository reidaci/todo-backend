const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const responseFormatter = require("../middleware/responseFormatter.js");
const tasksRouter = require("../tasks/tasks.router.js");
const authRouter = require("../auth/auth.router.js");
const userRouter = require("../users/users.router.js");
const { StatusCodes } = require("http-status-codes");
const expressWinstonLogger = require("../middleware/expressWinston.middleware.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger.config.js")

function configureApp(app) {
  app.use(cors());

  var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", "access.log"),
    {
      flags: "a",
    }
  );

  app.use(morgan("combined", { stream: accessLogStream }));

  app.use(expressWinstonLogger);

  app.use(responseFormatter);

  app.use("/", tasksRouter);
  app.use("/auth", authRouter);
  app.use("/users", userRouter);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json("Route not found");
  });
}

module.exports = configureApp;