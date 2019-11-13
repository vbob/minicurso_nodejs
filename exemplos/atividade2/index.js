class Aluno {
    constructor(nome, idade, endereco, email, idExistente) {
        this.id = idExistente || id++
        this.nome = nome
        this.idade = idade
        this.endereco = endereco
        this.email = email
    }
}

let alunos = []
let id = 1

let vitor = new Aluno('Vitor Barth', 21, 'Rua Zulmira Canavarros, 95', 'vitor.barth@gmail.com')
let andre = new Aluno('André da Silva', 33, 'Rua Zulmira Canavarros, 95', 'andre.silva@gmail.com')

alunos.push(vitor)
alunos.push(andre)


let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.listen(8080)
app.use(bodyParser.json())
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public_html/index.html')
})

app.get('/cadastrar', (req, res) => {
    res.sendFile(__dirname + '/public_html/cadastrar.html')
})

app.get('/editar/:id', (req, res) => {
    res.sendFile(__dirname + '/public_html/editar.html')
})

app.get('/remover/:id', (req, res) => {
    res.sendFile(__dirname + '/public_html/remover.html')
})


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
    console.log(req.body)
    let aluno = new Aluno(req.body.nome, req.body.idade, req.body.endereco, req.body.email)
    alunos.push(aluno)
    res.json(aluno)
})

app.put('/aluno/:id', (req, res) => {
    let idExistente = Number.parseInt(req.params.id)

    if (alunos.find(aluno => aluno.id == idExistente)) {
        let alunoNovo = new Aluno(req.body.nome, req.body.idade, req.body.endereco, req.body.email, idExistente)
        let indexAlunoAntigo = alunos.findIndex(aluno => aluno.id == idExistente)
        alunos[indexAlunoAntigo] = alunoNovo
        res.json(alunoNovo)

    }
    else
        res.status(400).json({ success: false, message: 'ID inexistente' })
})

app.delete('/aluno/:id', (req, res) => {
    let idExistente = Number.parseInt(req.params.id)

    if (alunos.find(aluno => aluno.id == idExistente)) {
        let indexAluno = alunos.findIndex(aluno => aluno.id == idExistente)
        alunos = alunos.filter(aluno => aluno.id != idExistente)
        res.json({ success: true })
    }

    else
        res.status(400).json({ success: false, message: 'ID inexistente' })
})