const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
    maxlength: [100, "firstName cannot be more than 100 characters"],
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, "lastName cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = model("User", userSchema);

module.exports = User;

/**
 * @swagger
 *
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *      - firstName
 *      - email
 *      - password
 *    properties:
 *      firstName:
 *        type: string
 *        description: The first name of the user
 *        maxLength: 100
 *      lastName:
 *        type: string
 *        description: The last name of the user
 *        maxLength: 100
 *      email:
 *        type: string
 *        description: A valid email address
 *      password:
 *        type: string
 *        description: Must contain 8 characters and also a number, a capital letter and a special character
 *    example:
 *      firstName: John
 *      lastName: Doe
 *      email: john@doe.com
 *      password: Password123#
 *  */