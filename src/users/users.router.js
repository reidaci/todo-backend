const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const userController = require("./users.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");

const userRouter = express.Router();

/**
 * @swagger
 *
 * /users/create:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: User created successfully
 *        content:
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 201
 *              message: Created
 *              data:
 *                _id: 673de6c779952edf27e811fa
 *                firstName: John
 *                lastName: Doe
 *                email: john@doe.com
 */
userRouter.post("/create", createUserValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return userController.handleCreateUser(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = userRouter;