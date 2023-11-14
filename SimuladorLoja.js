const produtos = [
  { nome: 'Sabonete', preco: 2.99, estoque: 10 },
  { nome: 'Shampoo', preco: 5.99, estoque: 5 },
  { nome: 'Toalha de banho', preco: 12.99, estoque: 10 },
  { nome: 'Bolacha recheada', preco: 1.50, estoque: 12 },
  { nome: 'Cafe', preco: 12.99, estoque: 15 },
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function encontrarProduto(nomeProduto, quantidade) {
  const nomeProdutoMinusculo = nomeProduto.toLowerCase();

  const item = produtos.find(produto => produto.nome.toLowerCase() === nomeProdutoMinusculo);
  if (item) {
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
  const subtotal = produto.preco * produto.quantidade;
  const icmsTotal = subtotal * icms;
  const total = subtotal + icmsTotal;
  return total;
}

function adicionarProduto() {
  let nomeProduto = "";
  let quantidade = "";
  let produto = "";
  nomeProduto = prompt('Digite o nome do produto: \nlista de produtos : \nSabonete - R$ 2.99 \nShampoo - R$ 5.99 \nToalha de banho - R$ 12.99 \nBolacha recheada - R$ 1.50  \nCafe - R$ 12.99  ').toLowerCase();
  quantidade = parseInt(prompt(`Digite a quantidade desejada de ${nomeProduto}:`));
  produto = encontrarProduto(nomeProduto, quantidade);

  if (produto) {
    carrinho.forEach(obj => {
      const totalComICMS = calcularTotalComICMS(obj);
      obj.precocomicms = totalComICMS.toFixed(2);
      obj.total = (obj.quantidade * obj.precocomicms).toFixed(2);
    });

    salvarCarrinhoLocalStorage();
    getListaCarrinho();
  } else {
    alert('Produto não encontrado. Por favor, escolha um produto válido.');
  }
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
        <td align="center">${obj.quantidade}</td>
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

  alert(`Valor de seu carrinho é'${Valorfinal}': R$ ${soma.toFixed(2)}`);
  
  reiniciarCarrinho();

}
getListaCarrinho();