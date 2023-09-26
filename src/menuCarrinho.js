import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[-360px]");
  document.getElementById("carrinho").classList.add("right-0");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-0");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout () {
  if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
return
  }
  window.location.href = "./checkout.html"
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botãoIrParaCheckout = document.getElementById("finalizar-compra")

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botãoIrParaCheckout.addEventListener('click', irParaCheckout)
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformaçãoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformaçãoQuantidade(idProduto);
}

function atualizarInformaçãoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);

  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elememtoArticle = document.createElement("article"); //<article></article>

  const articleClasses = [
    "flex",
    "bg-amber-600",
    "rounded-lg",
    "p-1",
    "relative",
  ];
  for (const articleCass of articleClasses) {
    elememtoArticle.classList.add(articleCass);
  }

  const cartaoProdutoCarrinho = `
    <button id="remover-item-${produto.id}">
    <i
    class="fa-solid fa-trash-can text-red-800 bg-yellow-50 p-1 rounded-full absolute top-1 right-1 hover:text-red-600"
    ></i>
    </button>
    <img class="h-24 rounded-lg"
    src="./assets/img/${produto.imagem}"
    alt="Carrinho: ${produto.nome}"
    />
    <div class="p-2 flex flex-col justify-between">
    <p class="text-slate-900 font-bold text-sm">
    ${produto.nome}
    </p>
    <p class="text-slate-800 font-semibold text-xs">Tamanho: M</p>
    <p class="text-white-700 font-bold">$ ${produto.preco}</p>
    </div>
    <div class="flex text-white-900 items-end text-xl">
    <button id="decrementar-produto-${
      produto.id
    }"><i class="fa-solid fa-circle-minus px-2  hover:text-red-900"></i></button>
    <p id="quantidade-${produto.id}"> ${
    idsProdutoCarrinhoComQuantidade[produto.id]
  } </p>
    <button id="incrementar-produto-${
      produto.id
    }"><i class="fa-solid fa-circle-plus px-2  hover:text-blue-600"></i></button>
    </div>`;

  elememtoArticle.innerHTML = cartaoProdutoCarrinho; //monta o article com o texto do cartaoProdutoCarrinho elmiminando a criação de cards conjuntos

  containerProdutosCarrinho.appendChild(elememtoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho = (document.getElementById(
    "produtos-carrinho"
  ).innerHTML = "");
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarInformaçãoQuantidade(idProduto);
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: R$ ${precoTotalCarrinho}`;
}
