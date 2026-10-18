// let titulo =  document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumeroSorteados = []; 
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o Número secreto, com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor que ' + chute);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior que ' + chute);        
        }
        // tentativas = tentativas + 1;
        tentativas++;
        limparCampo();
    }

}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosNaLista = listaDeNumeroSorteados.length;
    if (quantidadeDeNumerosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }
    if (listaDeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value= '';
}
function reiniciarJogo() {
    console.log('o botão foi clicado');
    window.speechSynthesis.cancel();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}