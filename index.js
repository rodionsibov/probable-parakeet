const express = require('express')
const app = express()
app.use(express.json())

const books = [
    { title: 'Harry Potter', id: 1 },
    { title: 'Twilight', id: 2 },
    { title: 'Lorem legacies', id: 3 }
]

app.get('/', (req, res) => {
    res.send('Welcome to the node.js tutorial')
})

app.get('/api/books', (req, res) => {
    res.send(books)
})

app.get('/api/books/:id', (req,res) => {
    const  book = books.find(c => c.id === parseInt(req.params.id))
    if(!book) res.status(404).send('<strong style="font-family: sans; color: tomato;">Ooops... Cannot find what you are looking for</strong>')
    res.send(book)
})



app.listen(3000, () => console.log('Active on port 3000'))