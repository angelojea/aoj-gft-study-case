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

Adjust the Address controller to have an endpoint that will receive a zip code as an input. With that number it should query data from the public endpoint https://viacep.com.br/ws/<zip-code>/json/ passing the value received and based on the return of that request, it should populate the properties of the Address entity, create a record in the data base and then return the id of the record created
