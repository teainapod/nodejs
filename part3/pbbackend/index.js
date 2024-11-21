const express = require('express')
const app = express()
app.use(express.json())

let phoneBook = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(phoneBook)
})

app.get('/info', (request, response) => {
  const numCount = phoneBook.length
  response.send(`<p>Phone has info for ${numCount} people. </p> <p>${Date()}</p>`)
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const onePerson = phoneBook.find( (n) => n.id=== id)
  if (onePerson)
    response.json(onePerson)
  else
    response.status(400).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phoneBook = phoneBook.filter((n) => n.id!==id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})