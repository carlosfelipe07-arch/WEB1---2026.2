import http from "node:http";

const produtos = [
  {
    id: 1,
    nome: "Teclado Mecânico",
    categoria: "Periféricos",
    preco: 250
  },
  {
    id: 2,
    nome: "Mouse Gamer",
    categoria: "Periféricos",
    preco: 150
  },
  {
    id: 3,
    nome: "Monitor 24",
    categoria: "Monitores",
    preco: 900
  }
];

const server = http.createServer((req, res) => {

  if (req.url === "/produtos") {

    const lista = produtos.map((produto) => `
      <li>
        ${produto.nome} - ${produto.categoria} - 
        R$ ${produto.preco}
        ${produto.preco > 500 ? " (DESTAQUE)" : ""}
      </li>
    `).join("");

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Produtos</title>
        </head>
        <body>
          <h1>Produtos</h1>

          <p>Quantidade de produtos: ${produtos.length}</p>

          <ul>
            ${lista}
          </ul>
        </body>
      </html>
    `);

  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end("<h1>Página não encontrada</h1>");
  }
});

server.listen(3000, () => {
  console.log("Servidor executando em http://localhost:3000");
});
