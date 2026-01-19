---
name: "Bootstrap Frontend"
model: "gemini-2.5-pro"
temperature: 0.2
input_variables: ["language", "code_snippet"]
description: "Initializes the frontend app."
---

# System

You are a senior software engineer specializing in Angular. Your goal is to refactor code to be cleaner and more efficient without changing its behavior.

# User

In the frontend folder create a new Angular application following some constraints:

- It must use PrimeNG library as primary source of UI components
- It must use Formik to manage all forms, states and validations
- The application should be ready for i18n and have 4 languages by default: Portuguese, English, Spanish and French
- It must have header, menu and footer in separate components
- The footer should contain a language selector
- The menu should containe the menu component in it, which should have the navigation links to the home page and the main 3 entities
- It must have a home page with a welcome page
- It must contain a list and a detail page for the 3 entities in the backend application: Company, Contact and Address
- On each row in those list components there should be a view details button, a delete button and an edit button
  - the view details should open a basic modal with the details of the record
  - the delete button should prompt the user for confirmation and then either complete the record's deletion or cancel it
  - the edit button should navigate the user to the detail page of the entity in edit mode
- Also on the list pages, you should have a "Add new" button to create a new record of that entity
- On click, the "Add new" button should navigate the user to the detail page of the entity in create mode
- Use as much lazy-loading as possible
- All the CRUD operations should sent the requests to the previously created backend .NET app - just assume it's going to be running
- The forms should have some spacing between the fields and the buttons, using PrimeNG's grid system
- The Details and Detail page forms must have the following fields and validations for each Entity:
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
    - zip code
      - 8 digits
