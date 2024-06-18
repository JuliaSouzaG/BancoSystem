
const txtCodigo = document.getElementById('codigo')
const txtNome = document.getElementById('nome')
const txtEndereco = document.getElementById('endereco')
const buscarId = document.getElementById('buscarId')

const criarBtn = document.getElementById('criarBtn')
const buscarBtn = document.getElementById('buscarBtn')

const tabela = document.getElementById('tblAgencia')
const tbody = tabela.querySelector('tbody')

const resultado = document.getElementById('resultado')

criarBtn.addEventListener('click', function (event) {
    const codigo = document.getElementById('codigo').value
    const nome = document.getElementById('nome').value
    const endereco = document.getElementById('endereco').value

    if (nome === '' || codigo === '') {
        console.log('num guento mais')
    } else {
        console.log('passando')
        // Aqui você pode enviar os dados para a API
        // Exemplo:
        enviarDadosParaAPI(codigo, nome)
        // Limpa os campos do formulário
        document.getElementById('codigo').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('endreco').value = ''
    }
})

// buscarBtn.addEventListener('click', function () {
//     buscarDadosNaAPI(buscarId.value)
// })

// Função para enviar dados para a API (exemplo)
async function enviarDadosParaAPI(codigo, nome) {
    //monta o json para ser enviado
    let data = {
        numero: codigo,
        nome: nome,
    }

    // Faz uma requisição POST para a API
    fetch('http://localhost:3000/api/agencia/criar/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Resposta da API:', data)
            localStorage.setItem('agenciaCriado', 'true')
            window.location.reload(true) // Atualiza a lista após deletar
        })
        .catch((error) => {
            console.error('Erro ao enviar dados:', error)
        })
}
// verifica o reload da pagina quando deleta e executa o toast
document.addEventListener('DOMContentLoaded', (event) => {
    const agenciaCriado = localStorage.getItem('agenciaCriado')
    if (agenciaCriado) {
        const toastLiveExample = document.getElementById('criarToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
  
        // Remove o item do localStorage para que o toast não apareça novamente na próxima recarga
        localStorage.removeItem('agenciaCriado')
    }
  })

// Função para fazer a solicitação à APIfunction buscarDadosNaAPI(codigoBanco) {
async function buscarDadosNaAPI(codigo_agencia) {
    let apiUrl = `http://localhost:3000/api/agencia/buscar/${codigo_agencia}`

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()

        // banco = data.banco
        // console.log(banco.id)
        // Atualizando o conteúdo da página
        // txtCodigo.value = banco.numero
        // txtNome.value = banco.nome
        // Limpa o conteúdo atual da tabela
        // tbody.innerHTML = ''

        return data.existe

        // buscarBanco(data.id);
    } catch (error) {
        console.error('Erro ao acessar a API:', error)
    }
}

function buscarAgencia() {
    // Faz a requisição para a API
    fetch(`http://localhost:3000/api/agencia/listar`)
        .then((response) => response.json())
        .then((data) => {
            // Preenche a tabela com os dados recebidos
            preencherTabela(data.agencias)
        })
        .catch((error) => {
            console.error('Erro ao obter dados da API:', error)
        })
}

function deletarAgencia(agenciaId, agenciaNome) {
    const labelDelet = document.getElementById('deletModalLabel')
    labelDelet.innerHTML = `
  Deletar o agencia ${agenciaNome}?`

    document.getElementById('btnConfirm').addEventListener('click', function () {
        fetch(`http://localhost:3000/api/agencia/delete/${agenciaId}`, {
            method: 'DELETE', // Usando o método DELETE
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('agenciaDeletado', 'true')
                window.location.reload(true)
                // Atualiza a lista após deletar
            })
            .catch((error) => {
                console.error('Erro ao deletar agencia:', error)
            })
    })
}

// verifica o reload da pagina quando deleta e executa o toast
document.addEventListener('DOMContentLoaded', (event) => {
  const agenciaDeletado = localStorage.getItem('agenciaDeletado')
  if (agenciaDeletado) {
      const toastLiveExample = document.getElementById('liveToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()

      // Remove o item do localStorage para que o toast não apareça novamente na próxima recarga
      localStorage.removeItem('agenciaDeletado')
  }
})

function preencherTabela(data) {
    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = ''

    // Itera sobre os dados e os insere na tabela
    data.forEach(function (agencia) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
      <td><button onclick="abrirModalEdicao(${agencia.id}, ${agencia.numero}, '${agencia.nome}')" class="btn-table" data-bs-toggle="modal" data-bs-target="#modalEdit"><i
                                    class="bi bi-pencil-square text-warning"></i></button></td>
      <td><button onclick="deletarAgencia(${agencia.id}, '${agencia.nome}')" class="btn-table" data-bs-toggle="modal" data-bs-target="#deletModal"><i class="bi bi-trash text-danger"></i></button></td>
      <td>${agencia.numero}</td>
      <td>${agencia.nome}</td>
      <td>${agencia.endereco}</td>
    `
        tbody.appendChild(tr)
    })
}

// Função para abrir o modal de edição
function abrirModalEdicao(agenciaId, numeroAtual, nomeAtual) {
    // Preenche os campos do modal com os dados atuais
    document.getElementById('editCodigo').value = numeroAtual
    document.getElementById('editNome').value = nomeAtual

    // Adiciona um listener para o botão de salvar alterações
    document.getElementById('btnSalvarEdicao').addEventListener('click', function () {
        // Obtém os novos valores dos campos
        const novoNumero = document.getElementById('editCodigo').value
        const novoNome = document.getElementById('editNome').value

        if (novoNumero === '' || novoNome === '') {
            console.log('aaaaaaaaaaaa')
        } else {
            // Monta o objeto com os novos dados
            const data = {
                numero: novoNumero,
                nome: novoNome,
            }

            // Faz a requisição PUT para atualizar os dados
            fetch(`http://localhost:3000/api/agencia/alterar?id=${agenciaId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    return response.json()
                })
                .then((data) => {
                  localStorage.setItem('agenciaEditado', 'true')
                  window.location.reload(true)// Atualiza a lista após editar
                })
                .catch((error) => {
                    console.error('Erro ao editar agencia:', error)
                })
        }
    })
}

// verifica o reload da pagina quando deleta e executa o toast
document.addEventListener('DOMContentLoaded', (event) => {
  const agenciaEditado = localStorage.getItem('agenciaEditado')
  if (agenciaEditado) {
      const toastLiveExample = document.getElementById('editToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()

      // Remove o item do localStorage para que o toast não apareça novamente na próxima recarga
      localStorage.removeItem('agenciaEditado')
  }
})

buscarAgencia()
