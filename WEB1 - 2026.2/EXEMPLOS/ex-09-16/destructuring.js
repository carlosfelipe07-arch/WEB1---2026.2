const notas =  [10, 9.2];
//notas[1]
//notas[0]
const [n1, n2] = notas;

console.log(n1);
console.log(n2);

//desestruturação de objetos
const pessoas = [{
    nome: "felipe",
    idade: 28,
    peso: 85.457,
},
{
    nome: "vitor",
    idade: 20,
    peso: 85,  
}];
const idadesAtualizadas = pessoas.map(({ idade }) => ++idade);
//const {idade} = pessoa;

console.log(idadesAtualizadas);