const numeros = [4, 36, 483, 39];
const nomes = ["lucas", "joao", "maria"];

//Operaçoes em Arrays
console.log(numeros[1]); //recupera um elemento do array, pelo indice
console.log(numeros.length);

nomes.push("Ramon") //puss adiciona no final
nomes.unshift("felipe"); //unshift adiciona no inicio
console.log(nomes);

const ultimo = nomes.pop(); // remove o ultimo elemento e retorna ele
const primeiro = nomes.shift(); //remove o primeiro e retorna ele

nomes[2] = "Joana";
console.log(nomes);

nomes.splice(1, 0, "Mateus") //exclui ou insere elementos em qualquer posição
console.log(nomes);

for (let i = 0; i < numeros.length; i++){
    console.log(numeros[i]);
}
numeros.forEach(function (numeros){
    console.log(numeros * 2);
});
