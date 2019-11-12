let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())

app.listen(8080, function (err) {
    if (err) throw err
    console.log('Servidor ouvindo em http://localhost:8080')
})


let timeSeries = {
    1: [],
    2: [],
    3: []
}

app.get('/timeseries', (req, res) => {
    res.json({ success: true, data: timeSeries })
})

app.get('/timeseries/:id', (req, res) => {
    let id = Number.parseInt(req.params.id)

    if (id > 0 && id < 4)
        res.json({ success: true, data: timeSeries[id] })

    else
        res.status(400).json({ success: false, message: 'ID deve ser 1, 2 ou 3' })
})

app.post('/timeseries/:id/:value', (req, res) => {
    let id = Number.parseInt(req.params.id)
    let val = Number.parseFloat(req.params.value)

    if (id > 0 && id < 4) {
        timeSeries[id].push(val)
        res.json({ success: true, data: timeSeries[id] })
    }

    else
        res.status(400).json({ success: false, message: 'ID deve ser 1, 2 ou 3' })
})

app.post('/timeseries/:id', (req, res) => {
    let id = Number.parseInt(req.params.id)

    if (id > 0 && id < 4) {
        timeSeries[id].push(Math.random() * 100)
        res.json({ success: true, data: timeSeries[id] })
    }

    else
        res.status(400).json({ success: false, message: 'ID deve ser 1, 2 ou 3' })
})



// PASSOS:
// 1. Importar o Express
// 2. Iniciar o servidor na porta 8080
// 3. Criar uma rota GET que retorna todas as TimeSeries
// 4. Criar uma rota GET que retorna uma TimeSeries por ID
// 5. Criar uma rota POST que salva um novo valor em uma TimeSeries por ID
// 6. Criar uma rota POST que adiciona um valor aleatório em uma TimeSeries por ID