
const txtCodigo = document.getElementById('codigo');
const txtNome = document.getElementById('nome');
const txtEndereco = document.getElementById('endereco');
const txtBanco = document.getElementById('banco');

const criarBtn =  document.getElementById('criarBtn')
const buscarBtn = document.getElementById('buscarBtn');

const resultado = document.getElementById('resultado');

criarBtn.addEventListener('click', function(event) {

    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const banco = document.getElementById('banco').value;

    // Aqui você pode enviar os dados para a API
    // Exemplo:
    enviarDadosParaAPI(codigo, nome, endereco, banco);

    // Limpa os campos do formulário
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('banco').value = '';

});

// buscarBtn.addEventListener('click', function() {
//     buscarDadosNaAPI(txtCodigo.value);
// });

// Função para enviar dados para a API (exemplo)
async function enviarDadosParaAPI(codigo, nome) {
    
    //monta o json para ser enviado
    let data = {
        numero: txtCodigo.value,
        nome: txtNome.value,
        endereco: txtEndereco.value,
        banco: txtBanco.value,
    }

    // Faz uma requisição POST para a API
    fetch('http://localhost:3000/api/agencia/criar/', {
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
        alert('Dados enviados com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados. Verifique o console para mais informações.');
      });
}   

// Função para fazer a solicitação à APIfunction buscarDadosNaAPI(codigoBanco) {
// async function buscarDadosNaAPI(codigo_banco) {

//     let apiUrl = `http://localhost:3000/api/banco/buscar/${codigo_banco}`;

//     try {
//         const response = await fetch(apiUrl,
//             {method: "GET",
//              headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             }
//          });

//         const data = await response.json();

//       // Atualizando o conteúdo da página
//       txtCodigo.value = data.numero;
//       txtNome.value = data.nome;
//       buscarAgencias(data.id);

//       } catch (error) {
//         console.error('Erro ao acessar a API:', error);
//       }
// }

// function buscarAgencias(id_banco) {
//   // Faz a requisição para a API
//   fetch(`http://localhost:3000/api/agencia/listar?id_banco=${id_banco}`)
//   .then(response => response.json())
//   .then(data => {
//     // Preenche a tabela com os dados recebidos
//     preencherTabela(data);
//   })
//   .catch(error => {
//     console.error('Erro ao obter dados da API:', error);
//   });
// }

// function preencherTabela(data) {
//   const tabela = document.getElementById('tblAgencias');
//   const tbody = tabela.querySelector('tbody');

//   // Limpa o conteúdo atual da tabela
//   tbody.innerHTML = '';

//   // Itera sobre os dados e os insere na tabela
  
//   data.forEach(function(agencia) {
//     const tr = document.createElement('tr');
//     tr.innerHTML = `
//       <td>${agencia.numero}</td>
//       <td>${agencia.nome}</td>
//       <td>${agencia.endereco}</td>
//     `;
//     tbody.appendChild(tr);
//   });
// }