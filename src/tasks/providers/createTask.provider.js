const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function createTaskProvider(req, res) {
  const validatedData = matchedData(req);

  const task = new Task({ ...validatedData, user: req.user.sub });
  try {
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    errorLogger("Error while creating task: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createTaskProvider;