export const catalogo = [
  {
    id: "1",
    marca: "Zara",
    nome: "Camisa Larga com Bolsos",
    preco: 70,
    imagem: "product-1.jpg",
    feminino: false,
  },
  {
    id: "2",
    marca: "Zara",
    nome: "Casaco Reto com Lã",
    preco: 85,
    imagem: "product-2.jpg",
    feminino: true,
  },
  {
    id: "3",
    marca: "Zara",
    nome: "Jaqueta com Efeito Camurça",
    preco: 60,
    imagem: "product-3.jpg",
    feminino: false,
  },
  {
    id: "4",
    marca: "Zara",
    nome: "Sobretudo em Mescla de Lã",
    preco: 160,
    imagem: "product-4.jpg",
    feminino: false,
  },
  {
    id: "5",
    marca: "Zara",
    nome: "Camisa Larga Acolchoada de Veludo Cotelê",
    preco: 110,
    imagem: "product-5.jpg",
    feminino: false,
  },
  {
    id: "6",
    marca: "Zara",
    nome: "Casaco de Lã com Botões",
    preco: 170,
    imagem: "product-6.jpg",
    feminino: true,
  },
  {
    id: "7",
    marca: "Zara",
    nome: "Casaco com Botões",
    preco: 75,
    imagem: "product-7.jpg",
    feminino: true,
  },
  {
    id: "8",
    marca: "Zara",
    nome: "Colete Comprido com Cinto",
    preco: 88,
    imagem: "product-8.jpg",
    feminino: true,
  },
];

export function salvarLocalStorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
localStorage.removeItem(chave)
}

export function desenharProdutoNoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elememtoArticle = document.createElement("article"); //<article></article>

  const articleClasses = [
    "flex",
    "bg-amber-600",
    "rounded-lg",
    "p-1",
    "relative",
    "mb-2",
    "min-w-[398px]"
  ];

  for (const articleCass of articleClasses) {
    elememtoArticle.classList.add(articleCass);
  }

  const cartaoProdutoCarrinho = `
    <img class="h-24 rounded-lg"
    src="./assets/img/${produto.imagem}"
    alt="Carrinho: ${produto.nome}"
    />
    <div class="p-2 flex flex-col justify-between text-right w-full">
    <p class="text-slate-900 font-bold text-sm">
    ${produto.nome}
    </p>
    <p class="text-slate-800 font-semibold text-xs">Tamanho: M</p>
    <p class="text-white-700 font-bold">$ ${produto.preco}</p>
    </div>
    <div class="flex text-white-900 items-end text-sm">
    
    <p id="quantidade-${produto.id}"> ${quantidadeProduto}un.</p>
  
    </div>`;

  elememtoArticle.innerHTML = cartaoProdutoCarrinho; //monta o article com o texto do cartaoProdutoCarrinho elmiminando a criação de cards conjuntos

  containerProdutosCarrinho.appendChild(elememtoArticle);
}
