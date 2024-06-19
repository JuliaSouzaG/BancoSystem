const txtCodigo = document.getElementById('codigo')
const txtNome = document.getElementById('nome')
const txtBanco = document.getElementById('banco')

const buscarId = document.getElementById('buscarId')

const criarBtn = document.getElementById('criarBtn')
const buscarBtn = document.getElementById('buscarBtn')

const tabela = document.getElementById('tblBanco')
const tbody = tabela.querySelector('tbody')

const resultado = document.getElementById('resultado')

criarBtn.addEventListener('click', function (event) {
    const codigo = document.getElementById('codigo').value
    const nome = document.getElementById('nome').value

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
    }
})

buscarBtn.addEventListener('click', function () {
    buscarDadosNaAPI(buscarId.value)
})

// Função para enviar dados para a API (exemplo)
async function enviarDadosParaAPI(codigo, nome) {
    //monta o json para ser enviado
    let data = {
        numero: codigo,
        nome: nome,
    }

    // Faz uma requisição POST para a API
    fetch('http://localhost:3000/api/banco/criar/', {
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
            localStorage.setItem('bancoCriado', 'true')
            window.location.reload(true) // Atualiza a lista após deletar
        })
        .catch((error) => {
            console.error('Erro ao enviar dados:', error)
        })
}
// verifica o reload da pagina quando deleta e executa o toast
document.addEventListener('DOMContentLoaded', (event) => {
    const bancoCriado = localStorage.getItem('bancoCriado')
    if (bancoCriado) {
        const toastLiveExample = document.getElementById('criarToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
  
        // Remove o item do localStorage para que o toast não apareça novamente na próxima recarga
        localStorage.removeItem('bancoCriado')
    }
  })

  async function buscarDadosNaAPI(codigo_banco) {
    let apiUrl = 'http://localhost:3000/api/banco/buscar/${codigo_banco}'

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()

       // Limpa o conteúdo atual da tabela
       const tableBody = document.querySelector('#tblBanco tbody');
       tableBody.innerHTML = '';

       // Verifica se o banco foi encontrado
       if (data && data.banco) {
           const banco = data.banco;

           // Cria uma nova linha na tabela
           const row = document.createElement('tr');
           row.innerHTML = `
               <td colspan="2">
                   <button class="btn btn-primary">Editar</button>
                   <button class="btn btn-danger">Excluir</button>
               </td>
               <td>${banco.numero}</td>
               <td>${banco.nome}</td>
           `;
           tableBody.appendChild(row);
       } else {
           const row = document.createElement('tr');
           row.innerHTML = `
               <td colspan="4" class="text-center">Nenhum banco encontrado com o código ${codigo_banco}</td>
           `;
           tableBody.appendChild(row);
       }
   

        // buscarBanco(data.id);
    } catch (error) {
        console.error('Erro ao acessar a API:', error)
    }
}

function buscarBanco() {
    // Faz a requisição para a API
    fetch(`http://localhost:3000/api/banco/listar`)
        .then((response) => response.json())
        .then((data) => {
            // Preenche a tabela com os dados recebidos
            preencherTabela(data.bancos)
        })
        .catch((error) => {
            console.error('Erro ao obter dados da API:', error)
        })
}

function deletarBanco(bancoId, bancoNome) {
    const labelDelet = document.getElementById('deletModalLabel')
    labelDelet.innerHTML = `
  Deletar o banco ${bancoNome}?`

    document.getElementById('btnConfirm').addEventListener('click', function () {
        fetch(`http://localhost:3000/api/banco/delete/${bancoId}`, {
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
                localStorage.setItem('bancoDeletado', 'true')
                window.location.reload(true)
                // Atualiza a lista após deletar
            })
            .catch((error) => {
                console.error('Erro ao deletar banco:', error)
            })
    })
}

// verifica o reload da pagina quando deleta e executa o toast
document.addEventListener('DOMContentLoaded', (event) => {
  const bancoDeletado = localStorage.getItem('bancoDeletado')
  if (bancoDeletado) {
      const toastLiveExample = document.getElementById('liveToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()

      // Remove o item do localStorage para que o toast não apareça novamente na próxima recarga
      localStorage.removeItem('bancoDeletado')
  }
})

function preencherTabela(data) {
    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = ''

    // Itera sobre os dados e os insere na tabela
    data.forEach(function (banco) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
      <td><button onclick="abrirModalEdicao(${banco.id}, ${banco.numero}, '${banco.nome}')" class="btn-table" data-bs-toggle="modal" data-bs-target="#modalEdit"><i
                                    class="bi bi-pencil-square text-warning"></i></button></td>
      <td><button onclick="deletarBanco(${banco.id}, '${banco.nome}')" class="btn-table" data-bs-toggle="modal" data-bs-target="#deletModal"><i class="bi bi-trash text-danger"></i></button></td>
      <td>${banco.numero}</td>
      <td>${banco.nome}</td>
    `
        tbody.appendChild(tr)
    })
}

// Função para abrir o modal de edição
function abrirModalEdicao(bancoId, numeroAtual, nomeAtual) {
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
            fetch(`http://localhost:3000/api/banco/alterar?id=${bancoId}`, {
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
                  localStorage.setItem('bancoEditado', 'true')
                  window.location.reload(true)// Atualiza a lista após editar
                })
                .catch((error) => {
                    console.error('Erro ao editar banco:', error)
                })
        }
    })
}

// verifica o reload da pagina quando deleta e executa o toast
document.addEventListener('DOMContentLoaded', (event) => {
  const bancoEditado = localStorage.getItem('bancoEditado')
  if (bancoEditado) {
      const toastLiveExample = document.getElementById('editToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()

      // Remove o item do localStorage para que o toast não apareça novamente na próxima recarga
      localStorage.removeItem('bancoEditado')
  }
})

buscarBanco()