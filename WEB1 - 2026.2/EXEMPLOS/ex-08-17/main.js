// Seleção de elementos do DOM
const imgPreferencia = document.getElementById("imgPreferencia");
const formCadastro = document.getElementById("formCadastro");
const sectionDados = document.getElementById("sectionDados");

function renderizarDados(nome, email, idade, senha, urlImagem) {
    const lista = document.createElement("ul");
    const item1 = document.createElement("li");
    const itemNome = document.createElement("li");
    const itemEmail = document.createElement("li");
    const itemIdade = document.createElement("li");
    const itemSenha = document.createElement("li");
    const itemUrlimagem = document.createElement("li");

    itemNome.textContent = "Nome: " + nome;
    itemEmail.textContent = "Email " + email;
    itemIdade.textContent = "Idade: " + idade;
    itemSenha.textContent = "Senha: " + senha;
    itemUrlimagem.textContent = "Urlimagem: " + urlImagem;

    lista.appendChild(itemNome);
    lista.appendChild(itemEmail);
    lista.appendChild(itemIdade);
    lista.appendChild(itemSenha);
    lista.appendChild(itemUrlimagem);

    sectionDados.appendChild(lista);

}

function cadastrarDados(evento) {
  evento.preventDefault(); // previne o refresh da página

  let nome = document.getElementById("email").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let idade = Number(document.getElementById("idade").value);
  let urlImagem = document.getElementById("urlImagem").value;

  imgPreferencia.src = urlImagem;

  renderizarDados(nome, email, idade, senha, urlImagem);

//  alert("Opa, virus detectado!");
}

formCadastro.addEventListener("submit", cadastrarDados);
//listener: escutador de eventos
