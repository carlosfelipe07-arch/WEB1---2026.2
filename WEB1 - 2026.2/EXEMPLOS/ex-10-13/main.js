const listaProdutos = document.getElementById("lista-produtos");

async function carregarProdutos() {
    try {
        const resposta = await fetch("https://fakestoreapi.com/products");
        const produtos = await resposta.json();

        produtos.forEach(produto => {
            const item = document.createElement("li");

            item.innerHTML = `
                <img src="${produto.image}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p>Preço: $ ${produto.price.toFixed(2)}</p>
                <p>${produto.category}</p>
            `;

            listaProdutos.appendChild(item);
        });
    } catch (erro) {
        listaProdutos.innerHTML = "<li>Erro ao carregar os produtos.</li>";
        console.error(erro);
    }
}

document.getElementById("botao-grade").addEventListener("click", () => {
    listaProdutos.classList.remove("lista");
    listaProdutos.classList.add("grade");
});

document.getElementById("botao-lista").addEventListener("click", () => {
    listaProdutos.classList.remove("grade");
    listaProdutos.classList.add("lista");
});

document.getElementById("botao-topo").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

carregarProdutos();
