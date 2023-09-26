import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import {
  atualizarPrecoCarrinho,
  inicializarCarrinho,
  renderizarProdutosCarrinho,
} from "./src/menuCarrinho";

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();

function descansoEmCasa() {
  const escutarMusicaeBoaAlimentacao = 0;
  const deitarDormirCedo = 1;
  const limparAreiaGorga = 10;
}
descansoEmCasa();
