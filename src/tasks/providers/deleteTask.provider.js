const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function deleteTaskProvider(req, res) {
  try {
    const deletedTask = await Task.deleteOne({ _id: req.body["_id"] });
    res.status(StatusCodes.OK).json(deletedTask);
  } catch (error) {
    errorLogger("Error while deleting task: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = deleteTaskProvider;