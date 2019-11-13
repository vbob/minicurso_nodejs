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

app.post('/cache', (req, res) => {
    cache = req.body.value

    res.json({
        success: true
    })
})

app.get('/cache', (req, res) => {
    res.json({
        value: cache
    })
})

app.get('/parametro/:id', (req, res) => {
    let id = req.params.id
    res.send(id)
})
