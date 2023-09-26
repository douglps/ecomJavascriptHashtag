import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderizarCatalogo() {
  for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `<div class=" w-48 my-2 flex flex-col p-2 justify-between shadow-lg shadow-lime-500/50  group ${
      produtoCatalogo.feminino ? "feminino" : "masculino"
    }" id="card-produto-${produtoCatalogo.id}">
  <img src="./assets/img/${produtoCatalogo.imagem}" alt="${
      produtoCatalogo.nome
    } do E-commerce" class="hover:scale-125 duration-300 my-7 rounded-lg"/>
  <p class="text-sm">${produtoCatalogo.marca}</p>
  <p class="text-sm">${produtoCatalogo.nome}</p>
  <p class="text-sm">$ ${produtoCatalogo.preco}</p>
  <button id='adicionar-${
    produtoCatalogo.id
  }' class="text-amber-600 text-2xl"><i class="fa-solid fa-circle-plus hover:text-amber-950"></i></button>
  </div>`;

    document.getElementById("container-produto").innerHTML += cartaoProduto;
  }

  for (const produtoCatalogo of catalogo) {
    document
      .getElementById(`adicionar-${produtoCatalogo.id}`)
      .addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
  }
}
