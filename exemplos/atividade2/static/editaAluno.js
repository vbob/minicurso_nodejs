let idAluno = window.location.pathname.split('/').pop()

fetch(`/aluno/${idAluno}`)
    .then(async data => {
        let aluno = await data.json()

        document.getElementById('inputID')
            .value = aluno.id

        document.getElementById('inputNome')
            .value = aluno.nome

        document.getElementById('inputIdade')
            .value = aluno.idade

        document.getElementById('inputEndereco')
            .value = aluno.endereco

        document.getElementById('inputEmail')
            .value = aluno.email
    })

class Aluno {
    constructor(id, nome, idade, endereco, email) {
        this.id = id
        this.nome = nome
        this.idade = idade
        this.endereco = endereco
        this.email = email
    }
}

function salvarAluno() {
    let id = document
        .getElementById('inputID')
        .value

    let nome = document
        .getElementById('inputNome')
        .value

    let idade = document
        .getElementById('inputIdade')
        .value

    let endereco = document
        .getElementById('inputEndereco')
        .value

    let email = document
        .getElementById('inputEmail')
        .value

    if (!nome || !idade || !endereco || !email) {
        alert("É necessário preencher todos os campos")
        return false
    }

    else {
        let aluno = new Aluno(id, nome, idade, endereco, email)

        fetch(`/aluno/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(aluno)
            })
            .then(async res => {
                console.log(await res.json())
            })


        window.location.pathname = '/'

        return false
    }

}