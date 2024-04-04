const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const totalPersons = persons.length;
  request.timestamp = new Date();
  const date = request.timestamp.toLocaleString();
  response.send(`<p>Phonebook has info for ${totalPersons} people</p>
  <p>${date}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const numberDuplicate = persons.some(
    (existingPerson) => existingPerson.name === person.name
  );
  if (numberDuplicate) {
    return response.status(400).json({
      error: "name have to be unique",
    });
  }
  const ids = persons.map((person) => person.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    name: person.name,
    number: person.number,
  };
  persons.push(newNote);
  console.log(newNote);
  response.json(newNote);
});

app.use((request, response) => {
  response.status(404).json({
    error: "Error 404 Not found page",
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
