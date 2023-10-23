const produtos = [
    { nome: 'Sabonete', preco: 2.99, estoque: 10},
    { nome: 'Shampoo', preco: 5.99, estoque: 5},
    { nome: 'Toalha de banho', preco: 12.99, estoque: 10},
    { nome: 'Bolacha recheada', preço: 1.50, estoque: 12},
    { nome: 'Cafe', preço: 12.99, estoque: 15},

];
function encontrarProduto(nomeProduto) {
    const nomeProdutoMinusculo = nomeProduto.toLowerCase(); 
    return produtos.find(produto => produto.nome.toLowerCase() === nomeProdutoMinusculo);
  }
  
  function calcularTotalComICMS(produto, quantidade) {
    const icms = 0.18; 
    const subtotal = produto.preco * quantidade;
    const icmsTotal = subtotal * icms;
    return subtotal + icmsTotal;
  }
  
  const nomeProduto = prompt('Digite o nome do produto: \nlista de produtos : \nSabonete - R$ 2.99 \nShampoo - R$ 5.99 \nToalha de banho - R$ 12.99 \nBolacha recheada - R$ 1.50  \nCafe - R$ 12.99  ').toLowerCase(); 
  const quantidade = parseInt(prompt(`Digite a quantidade desejada de ${nomeProduto}:`));
  
  const produto = encontrarProduto(nomeProduto);
  
  if (produto) {
    const totalComICMS = calcularTotalComICMS(produto, quantidade);
    console.log(`Você comprou ${quantidade} unidades de ${produto.nome}.`);
    console.log(`Valor total com ICMS: R$ ${totalComICMS.toFixed(2)}`);
  } else {
    console.log('Produto não encontrado. Por favor, escolha um produto válido.');
  }