import http from "node:http";

const produtos = [
  {
    nome: "Teclado Mecânico",
    categoria: "Periféricos",
    preco: 250
  },
  {
    nome: "Mouse Gamer",
    categoria: "Periféricos",
    preco: 150
  },
  {
    nome: "Monitor 24",
    categoria: "Monitores",
    preco: 900
  }
];

const server = http.createServer((req, res) => {
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

          <p>Total de produtos: ${produtos.length};</p>

          <ul>
          
          </ul>

          <p></p>
        </body>
      </html>
  `);
});

server.listen(3000, () => {
  console.log("Servidor executando em http://localhost:3000");
});