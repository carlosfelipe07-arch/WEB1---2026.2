// server.mjs
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';


const server = createServer((req, res) => {
  

 let conteudo = '';
 let codigo = 200;

 try {
     conteudo = readFileSync("./views/bj.html");
 } catch (erro) {
     conteudo = "<h1>Arquivo não encontrado!</h1>";
     codigo = 404;
 }

 res.writeHead(codigo, { "Content-Type": "text/html; charset=UTF-8",
    "Content-Language": "pr-BR" });

  res.end(conteudo);

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on node index.js');
});

// run with `node server.mjs`