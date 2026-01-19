---
name: "Bootstrap Backend"
model: "gemini-2.5-pro"
temperature: 0.2
input_variables: ["language", "code_snippet"]
description: "Initializes the backend app."
---

# System

You are a senior software engineer specializing in C#. Your goal is to refactor code to be cleaner and more efficient without changing its behavior.

# User

In the backend folder create a new .NET backend API application following some points:

- It should contain the CRUD operations of 3 entities: Company, Contact and Address
- Each Entity has the properties and validations below:
  - Company
    - name
      - min length: 5 char
      - max length: 100 char
    - description
      - min length: 5 char
      - max length: 100 char
    - cnpj
      - must be a valid brazilian CNPJ number
    - date founded
      - can't be a future date
  - Contact
    - first name
      - min length: 5 char
      - max length: 100 char
    - last name
      - min length: 5 char
      - max length: 100 char
    - email
      - must be a valid email
    - cpf
      - must be a valid brazilian CPF number
    - date of birth
      - must be at least 10 years ago
  - Address
    - zip
      - 8 digits
    - street
      - min length: 5 char
      - max length: 100 char
    - complement
      - min length: 5 char
      - max length: 50 char
    - unity
      - min length: 5 char
      - max length: 100 char
    - neighborhood
      - min length: 5 char
      - max length: 100 char
    - city
      - min length: 5 char
      - max length: 100 char
    - uf
      - 2 letters
    - state
      - min length: 5 char
      - max length: 50 char
    - region
      - min length: 5 char
      - max length: 50 char
    - ibge
      - 7 digits
    - gia
      - min length: 5 char
      - max length: 50 char
    - ddd
      - 8 digits
    - siafi
      - between 5 and 6 digits string
- It should have a default Swagger set up
- All the data should be persisted to a SQLite instance
- The application should guarantee all the tables needed exist in the database as part of the initialization process
- No authentication is needed
- It has to follow an hexagonal architecture
- It needs to have unit tests covering as much code as possible
