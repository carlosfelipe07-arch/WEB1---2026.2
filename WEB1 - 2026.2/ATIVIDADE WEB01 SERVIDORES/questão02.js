import http from "node:http";
import fs from "node:fs/promises";

const server = http.createServer(async (req, res) => {
  let arquivo;

  if (req.url === "/") arquivo = "index.html";
  if (req.url === "/contato") arquivo = "contato.html";

  try {
    const html = await fs.readFile(arquivo, "utf-8");

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(html);
  } catch {
    res.writeHead(500, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end("Erro ao ler o arquivo");
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
