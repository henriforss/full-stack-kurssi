/* This file creates a Person-model that is used for 
all communication between app and database. */

/* Import mongoose. */
const mongoose = require("mongoose")

/* Define database URL. */
const url = process.env.MONGODB_URI

/* Connect to database URL. */
console.log("Connecting to", url)
mongoose.connect(url)
    .then(result => {
        console.log("Connected to DB.")
    })
    .catch(error => {
        console.log("Error connecting to DB", error.message)
    })

/* Create a schema. */
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

/* Set schema. That is, convert everything to json/plain text. */
personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

/* Export model. */
module.exports = mongoose.model("Person", personSchema)