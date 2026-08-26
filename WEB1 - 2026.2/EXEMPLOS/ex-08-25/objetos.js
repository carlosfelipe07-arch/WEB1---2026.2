const cliente = {
    nome: "Felipe",
    sobrenome: "Rodrigues",
    idade: 28,
    nomeCompleto: function () {
        return this.nome + " " + this.sobrenome;
    },
    aumentarIdade: function () {
        this.idade++;
    },

};

cliente.aumentarIdade();
cliente.aumentarIdade();
console.log("Nova idade: " + cliente.idade);