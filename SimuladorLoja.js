const produtos = [
  { nome: 'Sabonete', preco: 6.49, estoque: 20 },
  { nome: 'Shampoo', preco: 20.90, estoque: 25 },
  { nome: 'Toalha de banho', preco: 26.60, estoque: 30 },
  { nome: 'Bolacha recheada', preco: 2.50, estoque: 22 },
  { nome: 'Cafe', preco: 20.00, estoque: 55 },
  { nome: 'Arroz', preco: 29.90, estoque: 42 },
  { nome: 'Feijão', preco: 12.99, estoque: 28 },
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function encontrarProduto(nomeProduto, quantidade) {
  const nomeProdutoMinusculo = nomeProduto.toLowerCase();

  const item = produtos.find(produto => produto.nome.toLowerCase() === nomeProdutoMinusculo);
  if (item && quantidade > 0 && quantidade <= item.estoque) {
    item.quantidade = quantidade;
    carrinho.push(item);
    salvarCarrinhoLocalStorage();
    return true;
  } else {
    return false;
  }
}

function calcularTotalComICMS(produto) {
  const icms = 0.18;
  const subtotal = produto.preco;
  const icmsTotal = subtotal * icms;
  const total = subtotal + icmsTotal;
  return total;
}

function adicionarProduto() {
  Swal.fire({
    title: 'Digite o nome do produto:',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Adicionar',
    showLoaderOnConfirm: true,
    preConfirm: (nome) => {
      nomeProduto = nome;
      
      return new Promise((resolve, reject) => {
        if (!encontrarProduto(nomeProduto, 1)) {
          reject('Produto não encontrado. Por favor, escolha um produto válido.');
        } else {
          resolve();
        }
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then(() => {
    Swal.fire({
      title: 'Digite a quantidade desejada:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Adicionar',
      showLoaderOnConfirm: true,
      preConfirm: (quantidadeInput) => {
        quantidade = parseInt(quantidadeInput);
        return true;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((resultQuantidade) => {
      if (resultQuantidade.isConfirmed) {
        carrinho.forEach(obj => {
          const totalComICMS = calcularTotalComICMS(obj);
          obj.precocomicms = totalComICMS.toFixed(2);
          obj.total = (obj.quantidade * obj.precocomicms).toFixed(2);
        });

        salvarCarrinhoLocalStorage();
        getListaCarrinho();
      } else if (resultQuantidade.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'error',
          title: 'Operação cancelada',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Quantidade inválida!',
          text: 'Por favor, insira uma quantidade válida.',
        });
      }
    });
  }).catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Produto não encontrado!',
      text: error,
    });
  });
}

function getListaCarrinho() {
  let listaCarrinho = "";

  if (carrinho.length > 0) {
    let contador = 0;
    carrinho.forEach(obj => {
      contador = contador + 1;
      listaCarrinho += `<tr>
        <td align="center">${contador}</td>
        <td>${obj.nome}</td>
        <td align="center">
        <button onclick="alterarQuantidade('${obj.nome}', -1)">-</button>
        ${obj.quantidade}
        <button onclick="alterarQuantidade('${obj.nome}', 1)">+</button>
      </td>  
        <td align="right">R$ ${obj.precocomicms}</td>
        <td align="right">R$ ${obj.total}</td>
        <td align="center"><button onclick="removerProduto('${obj.nome}')">Remover</button></td>
      </tr>`;
    });
  } else {
    listaCarrinho = `<tr><td align="center" colspan="5">Não existem produtos no seu carrinho</td></tr>`;
  }

  document.getElementById("carrinho").innerHTML = listaCarrinho;
}

function alterarQuantidade(nomeProduto, quantidade) {
  const index = carrinho.findIndex(item => item.nome === nomeProduto);
  if (index !== -1) {
    carrinho[index].quantidade += quantidade;
    if (carrinho[index].quantidade < 1) {
      carrinho[index].quantidade = 1; 
    }
    const totalComICMS = calcularTotalComICMS(carrinho[index]);
    carrinho[index].precocomicms = totalComICMS.toFixed(2);
    carrinho[index].total = (carrinho[index].quantidade * totalComICMS).toFixed(2);
    salvarCarrinhoLocalStorage();
    getListaCarrinho();
  }
}

function removerProduto(nomeProduto) {
  const index = carrinho.findIndex(item => item.nome === nomeProduto);
  if (index !== -1) {
    carrinho.splice(index, 1);
    salvarCarrinhoLocalStorage();
    getListaCarrinho();
  }
}

function salvarCarrinhoLocalStorage() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function reiniciarCarrinho() {
  carrinho = [];

  salvarCarrinhoLocalStorage();

  getListaCarrinho();
}

function exibirValorFinal() {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  const carrinho = JSON.parse(carrinhoSalvo) || [];

  const Valorfinal = 'total';
  const soma = carrinho.reduce((total, item) => total + parseFloat(item[Valorfinal]) || 0, 0);

  alert(`Valor de seu carrinho é '${Valorfinal}': R$ ${soma.toFixed(2)}`);

  reiniciarCarrinho();
}

getListaCarrinho();
