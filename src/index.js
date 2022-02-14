const express = require('express');
const { v4: uuidv4 } = require("uuid")

const app = new express();

app.use(express.json());

const customers = []

/* Dados da conta
*cpf - string
*name - string
*id - uuid - se trata de um universal unique id, um id gerado por uma biblioteca
*statement - []
*/

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({
      error: "Customer already exists!"
    });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });
  return response.status(201).send();
});

//localhost:8080
app.listen('8080')