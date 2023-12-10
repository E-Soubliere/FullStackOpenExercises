const express = require('express')
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.json());

let persons = [
    { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date.toDateString()} ${date.toTimeString()} ${date.toLocaleString()}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (request.body.name && request.body.number) {
        const person = {
            id: persons.length + 1,
            name: request.body.name,
            number: request.body.number
        }
        
        if (persons.map(p => p.name).includes(person.name)) {
            response.status(400).json({error: "Name must be unique"})
        } else {
            persons = [
                ...persons,
                person
            ]
            response.status(200)
        }
    } else {
        response.status(400).json({error: "Name or number missing"})
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})