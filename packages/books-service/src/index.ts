import express from "express";
import { components } from "./types/api";
import path from 'path';

type Book = components["schemas"]["Book"];
type Category = components["schemas"]["Category"];

const categories: Category[] = [
    {
        id: '0',
        name: 'Fiction',
    },
    {
        id: '1',
        name: 'French',
    },
];

const books: Book[] = [
    {
        id: '0',
        title: 'Illusion Perdues',
        authorId: '1',
        categoryId: '1',
    },
    {
        id: '1',
        title: 'Dune',
        authorId: '0',
        categoryId: '0',
    },
];

const app = express();
app.use(express.json());
app.use('/openapi', express.static(path.join(__dirname, 'openapi')))

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(a => a.id === req.params.id);
  if(book) {
    res.json(book);
  } else {
    res.status(404).json({"message": "not found"});
  }
})

app.get("/books", (req, res) => {
    const {ids} = req.query;
    console.log("ids, fetched ", ids);
  
    const filtered = books.filter((book) => (ids.includes(book.id)));
    if(filtered) {
        res.json(filtered);
    } else {
        res.status(404).json({"message": "not found"});
    }
})

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Books service is running on port ${PORT}`);
});