import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const port = 3003

const authors = [
  {
    editor: 'Gallimard',
    id: '0',
    name: 'Jean France',
  },
  {
    id: '1',
    editor: 'Pearson',
    name: 'James State',
  },
];


app.get('/author/:id', (req, res) => {
  const author = authors.find(a => a.id === req.params.id);
  if(author) {
    res.json(author);
  } else {
    res.status(404).json({"message": "not found"});
  }
})

app.get('/authors', (req, res) => {
  const {ids} = req.query;
  console.log("ids, fetched ", ids);
1
  
  const filtered = authors.filter((author) => (ids.includes(author.id)));
  if(filtered) {
    res.json(filtered);
  } else {
    res.status(404).json({"message": "not found"});
  }
  
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})