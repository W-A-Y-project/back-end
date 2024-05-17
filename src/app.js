const express = require('express')
const app = express();
const port = 3000

const db = require('./models/db')

app.get("/", async(req, res) => {
    res.send("Página inicial")
})

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`)
})