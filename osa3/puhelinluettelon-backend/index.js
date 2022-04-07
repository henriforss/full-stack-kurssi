/* Hardcoded entries for testing. */
let persons = [
    {   id: 1,
        name: "George Pullman",
        number: "555-9876",
    },
    {   id: 2,
        name: "King Kong",
        number: "765-8877",
    },
    {   id: 3,
        name: "Miss Terious",
        number: "645-8765",
    },
    {   id: 4,
        name: "Amanda Duckface",
        number: "888-7766",
    },
]

const { response } = require("express")
const { request } = require("express")

/* Create an express-object called "app" that is a function. */
const express = require("express")
const req = require("express/lib/request")
const app = express()

/* Get all entries in "persons". */
app.get("/api/persons", (request, response) => {
    response.json(persons)
})

/* Get info at "/info". */
app.get("/info", (request, response) => {
    const personsTotal = persons.length
    console.log(personsTotal, typeof personsTotal)
    const date = new Date()
    console.log(date)
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
    console.log(persons)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(204).end()
})

/* Listen to port for connections/requests. */
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})