const express = require("express")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()

app.use(express.static('public'))


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Rotas
app.get("/", (req, res) => {
    res.sendFile('index.html')
})

app.post("/location", async (req, res) => {
    let postData = req.body
    const key = process.env.API_KEY
    let result

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${postData.latitude}&lon=${postData.longitude}&lang=pt_br&units=metric&appid=${key}`

    await fetch(url) // faz um get na API
        .then(res => {
        return res.json() // converte a response em json
        })
        .then(res => {
            result = res
        })
        .catch(err => {
            console.log(err)
        })
    
    res.send(JSON.stringify(result))
})


app.listen(3000, () => {
    console.log("Servidor iniciado")
})