const express = require('express')
const app = express()
app.use(express.json())

const books = [
    { title: 'Harry Potter', id: 1 },
    { title: 'Twilight', id: 2 },
    { title: 'Lorem legacies', id: 3 }
]

// read request handlers
app.get('/', (req, res) => {
    res.send('Welcome to the node.js tutorial')
})

app.get('/api/books', (req, res) => {
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    console.log(req.params.id);
    const book = books.find(c => c.id === parseInt(req.params.id))
    if (!book) res.status(404).send('<h1 style="font-family: sans; color: tomato;">Ooops... Cannot find what you are looking for</h1>')
    res.send(book)
})

// create request handler
app.post('/api/books', (req, res) => {
    const {error} = validateBook(req.body)
    
})



app.listen(3000, () => console.log('Active on port 3000'))