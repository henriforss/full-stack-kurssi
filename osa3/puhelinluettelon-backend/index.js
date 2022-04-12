/* Require dotenv in order to use .env-file */
require("dotenv").config()

/* "Import" express, cors and morgan. */
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

/* Import custom mongoose module from models/person.js. */
const Person = require("./models/person")

/* Create an express-object called "app" that is a function. */
const app = express()

/* Enable built-in middleware "json-parser" for parsing POST-requests. */
app.use(express.json())

/* Enable and configure external middleware "morgan" for console logging. */
morgan.token("body", (request, response) => {
    const body = JSON.stringify(request.body)
    return body
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

/* Enable cors */
app.use(cors())

/* Enable built-in middleware static.  */
app.use(express.static("build"))

/* Get all entries in route "persons". */
app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

/* Get info at "/info". */
app.get("/info", (request, response) => {
    const personsTotal = persons.length
    const date = new Date()
    response.send(`Phonebook has info on ${personsTotal} persons. <br/> 
        ${date}`)
})

/* Get person by "id". If "id" is wrong, respond with status-code 404. */
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send("Error 404: Page not found.")
    }
})

/* Delete person by "id". */
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

/* Add new person. Requires json-parser to be enabled further up. */
app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            "Error": "No name."
        })
    }

    if (!body.number) {
        return response.status(400).json({
            "Error": "No number."
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

/* Listen to port for connections/requests. */
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})