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

function apagarAluno() {
    fetch(`/aluno/${idAluno}`,
        {
            method: 'DELETE'
        })
        .then(async res => {
            console.log(await res.json())
        })

    window.location.pathname = '/'

    return false
}