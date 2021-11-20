const express = require('express')
const Joi = require('joi')
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
    const book = books.find(c => c.id === parseInt(req.params.id))
    if (!book) res.status(404).send('<h1 style="font-family: sans; color: tomato;">Ooops... Cannot find what you are looking for</h1>')
    res.send(book)
})

// create request handler
app.post('/api/books', (req, res) => {
    const { error } = validateBook(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const book = {
        id: books.length + 1,
        title: req.body.title,
    }
    books.push(book)
    res.send(book)
})

// update request handler
app.put('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id))
    if (!book) res.status(404).send('<h1 style="font-family: sans; color: tomato;">Not found!</h1>')

    const { error } = validateBook(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    book.title = req.body.title
    res.send(book)
})

// delete request handler
app.delete('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id))
    if (!book) res.status(404).send('<h1 style="font-family: sans; color: tomato;">Not found!</h1>')

    const index = books.indexOf(book)
    books.splice(index, 1)

    res.send(book)
})

function validateBook(book) {
    const schema = {
        title: Joi.string().min(3).required()
    }
    return Joi.validate(book, schema)
}

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}...`))