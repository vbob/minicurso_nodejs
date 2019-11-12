let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())

app.listen(8080, function (err) {
    if (err) throw err
    console.log('Servidor ouvindo em http://localhost:8080')
})

class Aluno {
    constructor(id, nome, endereco, email) {
        this.id = id
        this.nome = nome
        this.endereco = endereco
        this.email = email
    }
}

let alunos = []

let vitor = new Aluno(1, 'Vitor Barth', 'Rua Zulmira Canavarros, 95', 'vitor.barth@gmail.com')
alunos.push(vitor)

app.get('/alunos', (req, res) => {
    res.json({
        quantidade: alunos.length,
        data: alunos
    })
})

app.get('/aluno/:id', (req, res) => {
    let id = Number.parseInt(req.params.id)

    res.json(alunos.find(aluno => aluno.id == id))
})

app.get('/aluno/email/:email', (req, res) => {
    let email = req.params.email
    res.json(alunos.find(aluno => aluno.email == email))
})

app.post('/aluno', (req, res) => {
    let id = Number.parseInt(req.params.id)    

    if (!alunos.find(aluno => aluno.id == id)) {
        let aluno = new Aluno(req.body.id, req.body.nome, req.body.endereco, req.body.email)
        alunos.push(aluno)
        res.json(aluno)
    }
    else
        res.status(400).json({ success: false, message: 'ID já existente' })
})

app.put('/aluno/:id', (req, res) => {
    let id = Number.parseInt(req.params.id)

    if (alunos.find(aluno => aluno.id == id)) {
        let alunoNovo = new Aluno(id, req.body.nome, req.body.endereco, req.body.email)
        let indexAlunoAntigo = alunos.findIndex(aluno => aluno.id = id)
        alunos[indexAlunoAntigo] = alunoNovo
        res.json(alunoNovo)

    }
    else
        res.status(400).json({ success: false, message: 'ID inexistente' })
})