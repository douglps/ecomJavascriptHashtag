import {
  lerLocalStorage,
  desenharProdutoNoCarrinhoSimples,
} from "./src/utilidades";

function criarPedidoHistorico(pedidoComData) {
  const elementoPedido = `<p class="text-xl text-bold my-5">${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR', {
    hour: '2-digit',
    minute: "2-digit"
  })}</p>
<section class="bg-violet-700 p-3 rounded-xl" id="container-pedidos-${pedidoComData.dataPedido}"> </section>`;
  const main = document.getElementsByTagName("main")[0];
  main.innerHTML += elementoPedido;

  for (const idProduto in pedidoComData.pedido) {
    desenharProdutoNoCarrinhoSimples(
      idProduto,
      `container-pedidos-${pedidoComData.dataPedido}`,
      pedidoComData.pedido[idProduto]
    );
  }
}

function renderizarHistoricoPedidos() {
  const historico = lerLocalStorage("historico");
  for (const pedidoComData of historico) {
    criarPedidoHistorico(pedidoComData);
  }
}

renderizarHistoricoPedidos();
