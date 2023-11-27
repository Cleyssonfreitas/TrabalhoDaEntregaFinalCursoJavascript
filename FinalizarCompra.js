let dadosUsuario = {
    endereco: "",
    cpf: "",
    nome: "",
    email: "",
    cep: "",
};

function capturarEndereco(valorEndereco) {
    dadosUsuario.endereco = valorEndereco;
    salvarLocalStorage();
}

function capturarCPF(valorCPF) {
    dadosUsuario.cpf = valorCPF;
    salvarLocalStorage();
}

function capturarNome(valorNome) {
    dadosUsuario.nome = valorNome;
    salvarLocalStorage();
}

function capturarEmail(valorEmail) {
    dadosUsuario.email = valorEmail;
    salvarLocalStorage();
}

function capturarCEP(valorCEP) {
    dadosUsuario.cep = valorCEP;
    salvarLocalStorage();
}

function salvarLocalStorage() {
    localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
}

function exibirResumo() {
    const dadosSalvos = JSON.parse(localStorage.getItem("dadosUsuario")) || {};

    console.log("Endereço:", dadosSalvos.endereco || "Não informado");
    console.log("CPF:", dadosSalvos.cpf || "Não informado");
    console.log("Nome:", dadosSalvos.nome || "Não informado");
    console.log("Email:", dadosSalvos.email || "Não informado");
    console.log("CEP:", dadosSalvos.cep || "Não informado");
}

function calcularValorFinal() {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  const carrinho = JSON.parse(carrinhoSalvo) || [];

  carrinho.forEach(obj => {
    const totalComICMS = calcularTotalComICMS(obj);
    obj.precocomicms = totalComICMS.toFixed(2);
    obj.total = (obj.quantidade * parseFloat(obj.precocomicms)).toFixed(2);
  });

  const Valorfinal = 'total';
  const soma = carrinho.reduce((total, item) => total + parseFloat(item[Valorfinal]) || 0, 0);

  const frete = (Math.random() * 10) + 1;

  const totalComFrete = soma + frete;

  return { frete, totalComFrete };
}


function exibirConfirmacaoCompra() {
  const { frete, totalComFrete } = calcularValorFinal();
  const dadosSalvos = JSON.parse(localStorage.getItem("dadosUsuario")) || {};

  Swal.fire({
    title: 'Confirmação de Compra ',
    html: `Seus dados são:<br> E-mail  : ${dadosSalvos.email} <br> Endreço: ${dadosSalvos.endereco} <br> Frete: R$ ${frete.toFixed(2)}<br>Total (com frete): R$ ${totalComFrete.toFixed(2)}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim, continuar',
    cancelButtonText: 'Não, cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      reiniciarCarrinho();

      Swal.fire('Sucesso!', 'Compra realizada com sucesso o boleto para pagamento será enviado em seu  E-mail.', 'success');

      localStorage.removeItem("carrinho");
    } else {

      Swal.fire('Cancelado', 'A compra foi cancelada.', 'info');
    }
  });
}
function calcularFrete() {
  const frete = (Math.random() * 10) + 1;

  const cepDigitado = document.querySelector('.campo').value;
  capturarCEP(cepDigitado);

  Swal.fire({
      title: 'Valor do Frete',
      text: `O valor do frete é R$ ${frete.toFixed(2)}`,
      icon: 'info',
      confirmButtonText: 'OK'
  });
  

}

