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

/* Create an express-object called "app" that is a function. */
const express = require("express")
const app = express()

/* Enable json-parser for parsing POST-requests. */
app.use(express.json())

/* Get all entries in "persons". */
app.get("/api/persons", (request, response) => {
    response.json(persons)
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

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            "Error": "Name taken. Choose another name."
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }  
    persons = persons.concat(person)
    response.json(person)
})

/* Listen to port for connections/requests. */
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})