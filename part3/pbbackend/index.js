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
  const maxId = phoneBook.length > 0
    ? Math.max(...phoneBook.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  //console.log(body)
  const found = phoneBook.filter(p => {
    //console.log(p.name)
    if( p.name === body.name) return p
  }) 
  //console.log(found.length)
  //console.log(found[0].name)
  if (!body.name || !body.number) {        
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (found.length) {        
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  phoneBook = phoneBook.concat(person)

  response.json(phoneBook)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})