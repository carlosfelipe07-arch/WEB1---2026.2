
const API = "https://fakestoreapi.com/products";

const lista = document.getElementById("lista-produtos");
const pesquisa = document.getElementById("pesquisa");
const categorias = document.getElementById("categorias");
const ordenacao = document.getElementById("ordenacao");

let produtos = [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let mostrarFavoritos = false;
let temporizadorNotificacao;

const dinheiro = valor => "$ " + valor.toFixed(2);

// Notificações
function avisar(mensagem) {
    const notificacao = document.getElementById("notificacao");

    notificacao.textContent = mensagem;
    notificacao.classList.add("visivel");

    clearTimeout(temporizadorNotificacao);

    temporizadorNotificacao = setTimeout(() => {
        notificacao.classList.remove("visivel");
    }, 2500);
}

// Carregar produtos
async function carregarProdutos() {
    lista.innerHTML = "<p>Carregando produtos...</p>";

    try {
        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os produtos.");
        }

        produtos = await resposta.json();

        categorias.innerHTML =
            '<option value="todas">Todas as categorias</option>';

        const listaCategorias = [...new Set(
            produtos.map(produto => produto.category)
        )];

        listaCategorias.forEach(categoria => {
            const opcao = document.createElement("option");

            opcao.value = categoria;
            opcao.textContent = categoria;

            categorias.appendChild(opcao);
        });

        mostrarProdutos();
        atualizarCarrinho();

    } catch (erro) {
        lista.textContent =
            "Erro ao carregar os produtos. Verifique sua conexão.";

        console.error(erro);
    }
}

// Mostrar produtos e aplicar filtros
function mostrarProdutos() {
    let resultado = [...produtos];

    const texto = pesquisa.value.toLowerCase();
    const categoria = categorias.value;
    const ordem = ordenacao.value;

    resultado = resultado.filter(produto =>
        produto.title.toLowerCase().includes(texto)
    );

    if (categoria !== "todas") {
        resultado = resultado.filter(produto =>
            produto.category === categoria
        );
    }

    if (mostrarFavoritos) {
        resultado = resultado.filter(produto =>
            favoritos.includes(produto.id)
        );
    }

    if (ordem === "menor") {
        resultado.sort((a, b) => a.price - b.price);
    }

    if (ordem === "maior") {
        resultado.sort((a, b) => b.price - a.price);
    }

    if (ordem === "nome") {
        resultado.sort((a, b) => a.title.localeCompare(b.title));
    }

    lista.innerHTML = "";

    document.getElementById("quantidade-produtos").textContent =
        `${resultado.length} produto(s) encontrado(s)`;

    document.getElementById("mensagem-vazia").hidden =
        resultado.length !== 0;

    resultado.forEach(produto => {
        const card = document.createElement("article");

        card.className = "produto";

        const imagem = document.createElement("div");
        imagem.className = "imagem-produto";

        const img = document.createElement("img");
        img.src = produto.image;
        img.alt = produto.title;
        img.loading = "lazy";

        imagem.appendChild(img);

        const categoria = document.createElement("p");
        categoria.className = "categoria";
        categoria.textContent = produto.category;

        const titulo = document.createElement("h3");
        titulo.textContent = produto.title;

        const preco = document.createElement("p");
        preco.className = "preco";
        preco.textContent = dinheiro(produto.price);

        const acoes = document.createElement("div");
        acoes.className = "acoes-produto";

        const adicionar = document.createElement("button");
        adicionar.className = "adicionar";
        adicionar.textContent = "🛒 Adicionar";

        adicionar.addEventListener("click", () => {
            adicionarCarrinho(produto.id);
        });

        const favorito = document.createElement("button");
        favorito.className = "favoritar";
        favorito.textContent =
            favoritos.includes(produto.id) ? "❤️" : "♡";

        if (favoritos.includes(produto.id)) {
            favorito.classList.add("ativo");
        }

        favorito.title = "Adicionar aos favoritos";

        favorito.addEventListener("click", () => {
            alternarFavorito(produto.id);
        });

        acoes.append(adicionar, favorito);

        card.append(imagem, categoria, titulo, preco, acoes);

        lista.appendChild(card);
    });
}

// Alternar favoritos
function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
        avisar("Produto removido dos favoritos.");
    } else {
        favoritos.push(id);
        avisar("Produto adicionado aos favoritos!");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarProdutos();
}

// Adicionar ao carrinho
function adicionarCarrinho(id) {
    const item = carrinho.find(produto => produto.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            id: id,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();

    avisar("Produto adicionado ao carrinho!");
}

// Salvar carrinho
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Atualizar carrinho
function atualizarCarrinho() {
    const itens = document.getElementById("itens-carrinho");

    itens.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho = carrinho.filter(item =>
        produtos.some(produto => produto.id === item.id)
        && item.quantidade > 0
    );

    carrinho.forEach(item => {
        const produto = produtos.find(p => p.id === item.id);

        if (!produto) return;

        total += produto.price * item.quantidade;
        quantidadeTotal += item.quantidade;

        const linha = document.createElement("div");
        linha.className = "item-carrinho";

        const img = document.createElement("img");
        img.src = produto.image;
        img.alt = produto.title;

        const detalhes = document.createElement("div");

        const titulo = document.createElement("h4");
        titulo.textContent = produto.title;

        const preco = document.createElement("p");
        preco.textContent = dinheiro(produto.price * item.quantidade);

        const quantidade = document.createElement("div");
        quantidade.className = "quantidade";

        const menos = document.createElement("button");
        menos.textContent = "−";
        menos.setAttribute("aria-label", "Diminuir quantidade");

        menos.addEventListener("click", () => {
            alterarQuantidade(item.id, -1);
        });

        const numero = document.createElement("span");
        numero.textContent = item.quantidade;

        const mais = document.createElement("button");
        mais.textContent = "+";
        mais.setAttribute("aria-label", "Aumentar quantidade");

        mais.addEventListener("click", () => {
            alterarQuantidade(item.id, 1);
        });

        quantidade.append(menos, numero, mais);
        detalhes.append(titulo, preco, quantidade);

        const remover = document.createElement("button");
        remover.className = "remover";
        remover.textContent = "✕";
        remover.title = "Remover produto";

        remover.addEventListener("click", () => {
            removerCarrinho(item.id);
        });

        linha.append(img, detalhes, remover);
        itens.appendChild(linha);
    });

    if (carrinho.length === 0) {
        itens.textContent = "Seu carrinho está vazio.";
    }

    document.getElementById("contador-carrinho").textContent =
        quantidadeTotal;

    document.getElementById("total-carrinho").textContent =
        dinheiro(total);

    salvarCarrinho();
}

// Alterar quantidade
function alterarQuantidade(id, valor) {
    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.id !== id);
    }

    atualizarCarrinho();
}

// Remover produto
function removerCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);

    atualizarCarrinho();

    avisar("Produto removido do carrinho.");
}

// Abrir e fechar carrinho
function abrirCarrinho() {
    document.getElementById("painel-carrinho")
        .classList.add("aberto");

    document.getElementById("fundo-modal")
        .classList.add("aberto");
}

function fecharCarrinho() {
    document.getElementById("painel-carrinho")
        .classList.remove("aberto");

    document.getElementById("fundo-modal")
        .classList.remove("aberto");
}

document.getElementById("abrir-carrinho")
    .addEventListener("click", abrirCarrinho);

document.getElementById("botao-carrinho")
    .addEventListener("click", abrirCarrinho);

document.getElementById("fechar-carrinho")
    .addEventListener("click", fecharCarrinho);

document.getElementById("fundo-modal")
    .addEventListener("click", fecharCarrinho);

// Limpar carrinho
document.getElementById("limpar-carrinho")
    .addEventListener("click", () => {
        carrinho = [];

        atualizarCarrinho();

        avisar("Carrinho limpo.");
    });

// Finalizar compra demonstrativa
document.getElementById("finalizar-compra")
    .addEventListener("click", () => {
        if (carrinho.length === 0) {
            avisar("Adicione produtos antes de continuar.");
            return;
        }

        avisar("Demonstração: pagamento não foi realizado.");
    });

// Pesquisa e filtros
pesquisa.addEventListener("input", mostrarProdutos);
categorias.addEventListener("change", mostrarProdutos);
ordenacao.addEventListener("change", mostrarProdutos);

// Visualização em grade
document.getElementById("alternar-grade")
    .addEventListener("click", () => {
        lista.classList.remove("lista");
        lista.classList.add("grade");

        avisar("Visualização em grade ativada.");
    });

// Visualização em lista
document.getElementById("alternar-lista")
    .addEventListener("click", () => {
        lista.classList.remove("grade");
        lista.classList.add("lista");

        avisar("Visualização em lista ativada.");
    });

// Mostrar favoritos
function abrirFavoritos() {
    mostrarFavoritos = true;

    document.querySelector(".titulo-secao h2").textContent =
        "Meus favoritos";

    document.getElementById("ver-favoritos").textContent =
        "Ver todos os produtos";

    mostrarProdutos();

    document.getElementById("produtos").scrollIntoView({
        behavior: "smooth"
    });
}

function verTodos() {
    mostrarFavoritos = false;

    document.querySelector(".titulo-secao h2").textContent =
        "Todos os produtos";

    document.getElementById("ver-favoritos").textContent =
        "❤️ Favoritos";

    mostrarProdutos();
}

document.getElementById("ver-favoritos")
    .addEventListener("click", () => {
        if (mostrarFavoritos) {
            verTodos();
        } else {
            abrirFavoritos();
        }
    });

document.getElementById("botao-favoritos")
    .addEventListener("click", () => {
        if (mostrarFavoritos) {
            verTodos();
        } else {
            abrirFavoritos();
        }
    });

// Tema claro e escuro
document.getElementById("tema").addEventListener("click", () => {
    document.body.classList.toggle("escuro");

    const escuro = document.body.classList.contains("escuro");

    document.getElementById("tema").textContent =
        escuro ? "☀️" : "🌙";

    localStorage.setItem("tema", escuro ? "escuro" : "claro");
});

// Restaurar tema salvo
if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("escuro");
    document.getElementById("tema").textContent = "☀️";
}

// Voltar ao topo
document.getElementById("botao-topo")
    .addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

// Tecla Escape fecha o carrinho
document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        fecharCarrinho();
    }
});

// Iniciar aplicação
carregarProdutos();
