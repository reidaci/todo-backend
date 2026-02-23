const express = require("express");
const dotenv = require("dotenv");
const configureApp = require("./src/settings/config.js");
const mongoose = require("mongoose");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFile = `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT;

app.use(express.json());

configureApp(app);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("Connnected To MongoDB");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();