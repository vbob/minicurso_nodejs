class Aluno {
    constructor(nome, idade, endereco, email) {
        this.nome = nome
        this.idade = idade
        this.endereco = endereco
        this.email = email
    }
}

function salvarAluno() {
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
        let aluno = new Aluno(nome, idade, endereco, email)

        fetch('/aluno',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(aluno)
            })
            .then(async res => {
                console.log(await res.json())
            })


        window.location.pathname = '/'

        return false
    }

}