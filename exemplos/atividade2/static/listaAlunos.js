function esconderMensagem() {
    document
        .getElementById("MensagemNenhumAluno")
        .classList
        .add('d-none')
}

function mostrarTabela() {
    document
        .getElementById("TabelaAlunos")
        .classList
        .remove('d-none')
}

function esconderTabela() {
    document
        .getElementById("TabelaAlunos")
        .classList
        .add('d-none')
}


function buscarAlunos(callback) {
    fetch('/alunos')
        .then(async res => {
            callback(await res.json())
        })
}

buscarAlunos(alunos => {
    if (alunos.quantidade > 0) {
        esconderMensagem()
        mostrarTabela()

        console.log(alunos)
        let corpoTabela = document.getElementById('CorpoTabelaAlunos')

        alunos.data.forEach(aluno => {
            corpoTabela.innerHTML += `
            <tr >
                <th scope="row"  class="align-middle">${aluno.id}</th>
                <td class="align-middle">${aluno.nome}</td>
                <td class="align-middle">${aluno.idade}</td>
                <td class="align-middle">${aluno.endereco}</td>
                <td class="align-middle">${aluno.email}</td>
                <td class="align-middle">
                    <a role="button" class="btn btn-info" href="/editar/${aluno.id}">Editar</a>
                    <a role="button" class="btn btn-danger" href="/remover/${aluno.id}">Apagar</a>
                </td>
            </tr>`
        })
    }

})
