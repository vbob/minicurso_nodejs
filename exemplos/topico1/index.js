let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())
app.use('/static', express.static('static'))

let cache = '123'

app.listen(8080, function (err) {
    if (err) throw err
    console.log('Servidor ouvindo em http://localhost:8080')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/texto', function (req, res) {
    res.send('Semana da Informática IFMT 2019')
})

app.get('/cache', (req, res) => {
    res.json({
        value: cache
    })
})

app.post('/cache', (req, res) => {
    try {
        if (req.body.value) {
            cache = req.body.value

            res.json({
                success: true
            })
        }
    }

    catch {
        res
            .status(400)
            .json({ success: false, message: 'Estrutura mal-formada' })
    }
})

app.get('/dinamica/:parametro', (req, res) => {
    let parametro = req.params.parametro

    res.send(parametro)
})

