/* Create  Mongoose schema for user. */

/* Import necessary modules. */
const mongoose = require("mongoose")

/* Create schema for User. */
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    /* Do not reveal password. */
    delete returnedObject.passwordHash
  }
})

/* Export modeule. */
module.exports = mongoose.model("User", userSchema)
