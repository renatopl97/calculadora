const operacaoAnteriorText = document.querySelector('.calculadora__display--anterior');
const operacaoAtualText = document.querySelector('.calculadora__display--atual')
const buttons = document.querySelectorAll('.calculadora__botoes button');

class Calculadora {
    constructor(operacaoAnteriorText, operacaoAtualText) {
        this.operacaoAnteriorText = operacaoAnteriorText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
    }

    //adiciona o digito a tela da calculadora
    addDigit(digito) {
        //checa se a operação atua já tem um ponto
        if(digito === "." && this.operacaoAtualText.innerText.includes(".")) {
            return;
        }

        this.operacaoAtual = digito;
        this.updateScreen();
    }

// Processa todos os cálculos
processaOperacoes(operacoes) {
    
    //pega valores atuais e anteriores
    let valorOperacao;
    const anterior = +this.operacaoAnteriorText.innerText;
    const atual = +this.operacaoAtualText.innerText;

    switch(operacoes) {
        case "+":
            valorOperacao = anterior + atual;
            this.updateScreen(valorOperacao, operacoes, atual, anterior);
            break;
        default:
            return;
    }
}

    //muda o valor na tela da calculadora
    updateScreen (
        valorOperacao = null, 
        operacoes = null, 
        atual= null, 
        anterior = null
    ) {
        console.log(valorOperacao, operacoes, atual, anterior);

        if(valorOperacao === null) {
            this.operacaoAtualText.innerText += this.operacaoAtual;
        } else {
            
        }
    }
}

const calc = new Calculadora(operacaoAnteriorText, operacaoAtualText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processaOperacoes(value);
        }
    })
})