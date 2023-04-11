const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;


let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let DATA = [
    { id: "todo-0", name: "Mangia", completed: true },
    { id: "todo-1", name: "Dormi", completed: false },
    { id: "todo-2", name: "Ripeti", completed: false }
  ];

app.get('/todos', (req, res) => {
    res.status(200).json(DATA)
});
app.get('/', (req, res) => {
    res.send('ciao');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));