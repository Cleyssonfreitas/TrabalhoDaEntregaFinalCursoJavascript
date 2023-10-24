const produtos = [
    { nome: 'Sabonete', preco: 2.99, estoque: 10},
    { nome: 'Shampoo', preco: 5.99, estoque: 5},
    { nome: 'Toalha de banho', preco: 12.99, estoque: 10},
    { nome: 'Bolacha recheada', preco: 1.50, estoque: 12},
    { nome: 'Cafe', preco: 12.99, estoque: 15},

];

let carrinho = []

// console.log(carrinho)
function encontrarProduto(nomeProduto,quantidade) {
    const nomeProdutoMinusculo = nomeProduto.toLowerCase(); 

    const item = produtos.find(produto => produto.nome.toLowerCase() === nomeProdutoMinusculo);
      item.quantidade = quantidade
    carrinho.push(item)
   
    return carrinho
  }

  function calcularTotalComICMS(produto) {
    const icms = 0.18; 
    const subtotal = produto.preco * produto.quantidade;
    const icmsTotal = subtotal * icms;
    const total = subtotal + icmsTotal;
    return total
  }
  
  function adicionarproduto(){
let nomeProduto = ""
let quantidade = ""
let produto = ""
   nomeProduto = prompt('Digite o nome do produto: \nlista de produtos : \nSabonete - R$ 2.99 \nShampoo - R$ 5.99 \nToalha de banho - R$ 12.99 \nBolacha recheada - R$ 1.50  \nCafe - R$ 12.99  ').toLowerCase(); 
   quantidade = parseInt(prompt(`Digite a quantidade desejada de ${nomeProduto}:`));
   produto = encontrarProduto(nomeProduto,quantidade);
    if (produto) { 
      console.log(carrinho)
      carrinho.forEach(obj => {
        const totalComICMS = calcularTotalComICMS(obj);
        obj.precocomicms = totalComICMS.toFixed(2)
        console.log(`Você comprou ${obj.quantidade} unidades de ${obj.nome}.`);
        console.log(`Valor total com ICMS: R$ ${totalComICMS.toFixed(2)}`);
      })
      getlistacarrinho()
    } else {
      console.log('Produto não encontrado. Por favor, escolha um produto válido.');
    }

  }
  function getlistacarrinho() {
    let listaCarrinho = []
    if(carrinho.length > 0) {
      let contador = 0
      carrinho.forEach(obj => {
        contador = contador + 1
        listaCarrinho += `<tr> <td align="center"> ${contador} </td>  <td> ${obj.nome} </td> <td align="center"> ${obj.quantidade} </td>  <td align="right" > R$ ${obj.precocomicms} </td>  <td align="right"> R$ ${obj.quantidade * obj.precocomicms} </td> </tr>`
      })
    } else { 
      listaCarrinho = `<tr > <td align="center" colspan="5"> não existe produtos no seu carrinho </td> </tr>`
    }
  console.log(listaCarrinho) 
document.getElementById("carrinho").innerHTML = listaCarrinho;
  }
getlistacarrinho()

  
  
 