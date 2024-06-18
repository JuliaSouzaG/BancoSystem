const alerta = document.getElementById('alerta');
const txtCodigo = document.getElementById('codigo');
const txtNome = document.getElementById('nome');

const criarBtn = document.getElementById('criarBtn')
const buscarBtn = document.getElementById('buscarBtn');

const resultado = document.getElementById('resultado');

criarBtn.addEventListener('click', function (event) {

  const codigo = document.getElementById('codigo').value;
  const nome = document.getElementById('nome').value;

  // Aqui você pode enviar os dados para a API
  // Exemplo:
  enviarDadosParaAPI(codigo, nome);

  // Limpa os campos do formulário
  document.getElementById('codigo').value = '';
  document.getElementById('nome').value = '';

});

buscarBtn.addEventListener('click', function () {
  buscarDadosNaAPI(txtCodigo.value);
});

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
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Resposta da API:', data);
      buscarBanco()
      alerta.innerHTML = `
        <div class="alert alert-success" role="alert">
         <i class="bi bi-check-circle-fill"></i> Banco cadastrado com Sucesso!
        </div>`
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
      alerta.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Erro ao enviar dados. Verifique o console para mais informações.!
        </div>`
    });
}

// Função para fazer a solicitação à APIfunction buscarDadosNaAPI(codigoBanco) {
async function buscarDadosNaAPI(codigo_banco) {

  let apiUrl = `http://localhost:3000/api/banco/buscar/${codigo_banco}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    // Atualizando o conteúdo da página
    txtCodigo.value = data.numero;
    txtNome.value = data.nome;
    // buscarBanco(data.id);

  } catch (error) {
    console.error('Erro ao acessar a API:', error);
  }
}

function buscarBanco() {
  // Faz a requisição para a API
  fetch(`http://localhost:3000/api/banco/listar`)
    .then(response => response.json())
    .then(data => {
      // Preenche a tabela com os dados recebidos
      preencherTabela(data.bancos);
    })
    .catch(error => {
      console.error('Erro ao obter dados da API:', error);
    });
}

function deletarBanco(bancoId) {
  document.getElementById('btnConfirm').addEventListener('click', function () {
    fetch(`http://localhost:3000/api/banco/delete/${bancoId}`, {
      method: 'DELETE', // Usando o método DELETE
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        buscarBanco(); // Atualiza a lista após deletar
      })
      .catch(error => {
        console.error('Erro ao deletar banco:', error);
      });
  });
}

function preencherTabela(data) {
  const tabela = document.getElementById('tblBanco');
  const tbody = tabela.querySelector('tbody');

  // Limpa o conteúdo atual da tabela
  tbody.innerHTML = '';

  // Itera sobre os dados e os insere na tabela

  data.forEach(function (banco) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><button onclick="abrirModalEdicao(${banco.id}, ${banco.numero}, '${banco.nome}')" class="btn-table" data-bs-toggle="modal" data-bs-target="#modalEdit"><i
                                    class="bi bi-pencil-square text-warning"></i></button></td>
      <td><button onclick="deletarBanco(${banco.id})" class="btn-table" data-bs-toggle="modal" data-bs-target="#deletModal"><i class="bi bi-trash text-danger"></i></button></td>
      <td>${banco.numero}</td>
      <td>${banco.nome}</td>
    `;

    tbody.appendChild(tr);
  });

}

// Função para abrir o modal de edição
function abrirModalEdicao(bancoId, numeroAtual, nomeAtual) {
  // Preenche os campos do modal com os dados atuais
  document.getElementById('editCodigo').value = numeroAtual;
  document.getElementById('editNome').value = nomeAtual;

  // Adiciona um listener para o botão de salvar alterações
  document.getElementById('btnSalvarEdicao').addEventListener('click', function() {

      // Obtém os novos valores dos campos
      const novoNumero = document.getElementById('editCodigo').value;
      const novoNome = document.getElementById('editNome').value;

      // Monta o objeto com os novos dados
      const data = {
          numero: novoNumero,
          nome: novoNome
      };

      // Faz a requisição PUT para atualizar os dados
      fetch(`http://localhost:3000/api/banco/alterar?id=${bancoId}`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          alert('Banco editado com sucesso');
          buscarBanco(); // Atualiza a lista após editar
      })
      .catch(error => {
          console.error('Erro ao editar banco:', error);
      });
  });
}

buscarBanco();