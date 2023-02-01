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
    //checagem se o valor atual está vazio
    if(this.operacaoAtualText.innerText === "" && operacoes !== "C") {
        //muda a operação
        if(this.operacaoAnteriorText.innerText !== "") {
            this.mudaOperacao(operacoes);
        }
        return;
    }

    //pega valores atuais e anteriores
    let valorOperacao;
    const anterior = +this.operacaoAnteriorText.innerText.split(" ")[0];
    const atual = +this.operacaoAtualText.innerText;

    switch(operacoes) {
        case "+":
            valorOperacao = anterior + atual;
            this.updateScreen(valorOperacao, operacoes, atual, anterior);
            break;
        case "-":
            valorOperacao = anterior - atual;
            this.updateScreen(valorOperacao, operacoes, atual, anterior);
            break;
        case "/":
            valorOperacao = anterior / atual;
            this.updateScreen(valorOperacao, operacoes, atual, anterior);
            break;
        case "*":
            valorOperacao = anterior * atual;
            this.updateScreen(valorOperacao, operacoes, atual, anterior);
            break;
        case "DEL":
            valorOperacao = anterior * atual;
            this.opeDel();
            break;
        case "CE":
            valorOperacao = anterior * atual;
            this.opeCe();
            break;
        case "C":
            valorOperacao = anterior * atual;
            this.opeC();
            break;
        case "=":
            valorOperacao = anterior * atual;
            this.opeIgual();
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
        if(valorOperacao === null) {
            this.operacaoAtualText.innerText += this.operacaoAtual;
        } else {
            //checa se o valor é zero, se for apenas adiciona o valor
            if(anterior === 0) {
                valorOperacao = atual;
            }

            //adiciona o valor para o anterior
            this.operacaoAnteriorText.innerText = `${valorOperacao} ${operacoes}`;
            this.operacaoAtualText.innerText = "";
        }
    }

    // muda a operação matemática 
    mudaOperacao(operacoes) {
        const operacoesMath = ["*", "/", "-", "+"]

        if(!operacoesMath.includes(operacoes)) {
            return
        }

        this.operacaoAnteriorText.innerText = this.operacaoAnteriorText.innerText.slice(0, -1) + operacoes;
    }

    //deleta o ultimo digito
    opeDel() {
        this.operacaoAtualText.innerText = this.operacaoAtualText.innerText.slice(0, -1);
    }

    //limpa a operação atual
    opeCe() {
        this.operacaoAtualText.innerText = "";
    }
    //limpa todas as operações
    opeC() {
        this.operacaoAnteriorText.innerText = "";
        this.operacaoAtualText.innerText = "";
    }

    opeIgual() {
        const operacoes = operacaoAnteriorText.innerText.split (" ")[1];
        this.processaOperacoes(operacoes);
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