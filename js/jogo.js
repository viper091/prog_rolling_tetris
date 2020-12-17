let CELLSIZE = '20px'
let isRunning = 0; // usada para verificar se o jogo está rodando
let currentLine = 0; //usada para saber qual linha da tabela o elemento está atualmente, a linha relacionada com a primeira linha do elemento
let currentCol = 0; //usada para saber qual coluna o elemento, a coluna é da primeira coluna a esquerda do objeto
let down = 0; //usada para ajudar na verificação quando o usuário aperta para as peças descerem, pressionando a tecla para baixo
let change = []; //usada para ajudar na verificação quando o usuário aperta para as peças mudarem de lado, pressionando a tecla para os lados
let rotate = 0; //usada para ajudar na verificação quando o usuário aperta para as peças rotacionarem, pressionando a tecla para cima
let larguraTable = 10 //largura da tabela, pode ser alterada de acordo com o tamanho de tabela que o usuário selecionar
let alturaTable = 20 //altura da tabela, pode ser alterada de acordo com o tamanho de tabela que o usuário selecionar
let speed = 800; // velocidade inicial em milisegundos

//As linhas a seguir são as representações dos elementos por um objeto, que contem a estrutura do elemento e sua cor. 
// A matriz de 1 e 0, representam o elemento, onde 1 é para ser pintado e 0 nao possui nada naquele local (espaço em branco) 

let elem1 = {
    elem: [
        [1],
        [1],
        [1],
        [1]
    ],
    color: 'blue'
};
let elem2 = {
    elem: [
        [1, 1],
        [1, 1]
    ],
    color: 'yellow'
};
let elem3 = {
    elem: [
        [1, 0],
        [1, 0],
        [1, 1]
    ],
    color: 'grey'
};
let elem4 = {
    elem: [
        [0, 1],
        [0, 1],
        [1, 1]
    ],
    color: 'orange'
};
let elem5 = {
    elem: [
        [0, 1, 0],
        [1, 1, 1]
    ],
    color: 'red'
};
let elem6 = {
    elem: [
        [1, 0, 1],
        [1, 1, 1]
    ],
    color: 'purple'
};
let elem7 = {
    elem: [
        [1]
    ],
    color: 'cyan'
};


//As funções com promise, são usadas durante o jogo. Para que sejam executadas de acordo com a anteriores se já foram realizadas.

//Dentre dentre os métodos mais usados de JS, está o getComputedStyle, que é usado para verificar se o espaço está em branco. 
//Sendo assim, ele verifica se o espaço está vazio para o elemento ocupá-lo 

//Grande parte das funções existem dois trechos, um para quando os elementos estão subindo e outro para quando os elementes estão descendo


// A seguinte função é usada para virar a tabela, é usada quando o elemento 7 faz a linha desaparecer
function rotateTable(table) {
    return new Promise(resolve => {
        setTimeout(() => {
            let arrayColors = new Array(alturaTable);

            for (let i = 0; i < arrayColors.length; i++) {
                arrayColors[i] = new Array(larguraTable);
            }

            for (let i = 0; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    arrayColors[i][j] = getComputedStyle(table.rows[i].cells[j]).getPropertyValue("background-color");
                }
            }


            for (let i = 0; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].style.backgroundColor = arrayColors[(alturaTable - 1) - i][j];
                }
            }
            resolve(1);
        }, 1);
    });
}

// A seguinte função é usada para rotacionar o elemento, de acordo com quantas vezes o usuário apertar com a tecla para cima
function rotateElem(table, elem, qtyRows, color, goDown) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (goDown) {

                for (let index = 0; index < rotate; index++) { //realiza as mudanças de acordo com a quantidade de vezes que o usuário apertou a tecla para cima
                    let newElem = new Array(elem[0].length); //cria as linhas do novo elemento
                    for (let i = 0; i < elem[0].length; i++) { //cria as colunas do novo elemento
                        newElem[i] = new Array(elem.length);
                    }
                    //a próxima iteração transforma as linhas em colunas, para virar o elemento
                    for (let i = 0; i < newElem.length; i++) {
                        for (let j = 0; j < newElem[i].length; j++) {
                            newElem[i][j] = elem[j][i];
                        }
                    }
                    //inverte as linhas para que o elemento fique correto
                    newElem = newElem.reverse();
                    //verifica se é possível virar o elemento, para que o elemento não sai para o lado da tabela. 
                    //Caso não seja possível, é  dado o resolve e return para sair da função e consequentemente, para as rotações naquele momento
                    for (let i = 0; i < newElem.length; i++) {
                        if ([currentCol + newElem[i].length - 1] > (table.rows[qtyRows].cells.length - 1)) {
                            rotate = 0; //zerado para não ficar em buffer nas próximas tentativas de rotação
                            resolve(elem);
                            return;
                        }
                    }

                    for (let i = 0; i < newElem.length; i++) { //itera as linhas do elemento
                        for (let j = 0; j < newElem[i].length; j++) { //itera as colunas do elemento
                            if (newElem[i][j]) { //verifica se é parte do elemento (quando possui 1)
                                if (window.getComputedStyle(table.rows[i + qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)') { //verifica se o novo elemento não vai ocupar o esoaço de um outro na tabela
                                    let sair = 0; //usado como variável auxiliar para sair do for
                                    //as duas próximas iterações verificam se o elemento que já está preenchido, se não é do próprio elemento original
                                    for (let iEl = 0; iEl < elem.length; iEl++) {
                                        for (let jEl = 0; jEl < elem[iEl].length; jEl++) {
                                            if (elem[iEl][jEl]) {
                                                if (((iEl + qtyRows) == (i + qtyRows)) && (((jEl + currentCol == (j + currentCol))))) {
                                                    sair = 1;
                                                    break;
                                                }
                                            }
                                        }
                                        if (sair) { //caso o ponto que já estava preenchido, seja da tabela original, sai da iteração;
                                            break;
                                        }
                                    }
                                    if (!sair) { //caso o elemento fosse ocupar o lugar de outro, ele retorna o próprio elemento original, sem modificações;
                                        rotate = 0;
                                        resolve(elem);
                                        return
                                    }
                                }
                            }
                        }
                    }
                    for (let i = 0; i < elem.length; i++) { //limpa a células que o elemento original preenchia
                        for (let j = 0; j < elem[i].length; j++) {
                            if (elem[i][j]) {
                                table.rows[i + qtyRows].cells[j + currentCol].style.backgroundColor = 'white';
                            }
                        }
                    }
                    elem = newElem;
                    for (let i = 0; i < newElem.length; i++) { //preenche as células com o elemento novo
                        for (let j = 0; j < newElem[i].length; j++) {
                            if (newElem[i][j]) {
                                table.rows[i + qtyRows].cells[j + currentCol].style.backgroundColor = color;
                            }
                        }
                    }
                }
                rotate = 0;

                resolve(elem);
            } else { //as linhas a seguir são bem parecidas com o do if, entretanto as verificações são feitas para quando o elemento está subindo. 
                for (let index = 0; index < rotate; index++) {
                    let newElem = new Array(elem[0].length);
                    for (let i = 0; i < elem[0].length; i++) {
                        newElem[i] = new Array(elem.length);
                    }
                    for (let i = 0; i < newElem.length; i++) {
                        for (let j = 0; j < newElem[i].length; j++) {
                            newElem[i][j] = elem[j][i];
                        }
                    }
                    newElem = newElem.reverse();
                    for (let i = 0; i < newElem.length; i++) {
                        if ([currentCol + newElem[i].length - 1] > (table.rows[qtyRows].cells.length - 1)) {
                            rotate = 0;
                            resolve(elem);

                            return;
                        }
                    }
                    for (let i = 0; i < newElem.length; i++) {
                        for (let j = 0; j < newElem[i].length; j++) {
                            if (newElem[i][j]) {
                                if (window.getComputedStyle(table.rows[(alturaTable - 1) - i - qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)') {
                                    let sair = 0;
                                    for (let iEl = 0; iEl < elem.length; iEl++) {
                                        for (let jEl = 0; jEl < elem[iEl].length; jEl++) {
                                            if (elem[iEl][jEl]) {
                                                if (((iEl + qtyRows) == (i + qtyRows)) && (((jEl + currentCol == (j + currentCol))))) {
                                                    sair = 1;
                                                    break;
                                                }
                                            }
                                        }
                                        if (sair) {
                                            break;
                                        }
                                    }
                                    if (!sair) {
                                        rotate = 0;
                                        resolve(elem);
                                        return
                                    }
                                }
                            }


                        }
                    }
                    for (let i = 0; i < elem.length; i++) {
                        for (let j = 0; j < elem[i].length; j++) {
                            if (elem[i][j]) {
                                table.rows[(alturaTable - 1) - i - qtyRows].cells[j + currentCol].style.backgroundColor = 'white';
                            }
                        }
                    }

                    elem = newElem;

                    for (let i = 0; i < newElem.length; i++) {
                        for (let j = 0; j < newElem[i].length; j++) {
                            if (newElem[i][j]) {
                                table.rows[(alturaTable - 1) - i - qtyRows].cells[j + currentCol].style.backgroundColor = color;
                            }
                        }
                    }
                }
                rotate = 0;
                resolve(elem);

            }
        }, 1);
    });
}


//A seguinte função verifica se é possível que o elemento desça uma linha de acordo com o tempo percorrido
function downTable(elem, table, color, qtyRows, goDown) {
    return new Promise(resolve => {
        setTimeout(() => {
            currentLine = qtyRows; //atriibui a linha atual, para saber aonde o elemento está atualmente
            if (qtyRows == 0) { //verifica se é possível printar o elemento, caso não, significa que o jogo acabou
                if (goDown) {
                    for (let i = 0; i < elem.length; i++) {
                        for (let j = 0; j < elem[i].length; j++) {
                            if (elem[i][j]) {

                                if (window.getComputedStyle(table.rows[i].cells[j]).getPropertyValue("background-color") != 'rgb(255, 255, 255)') {
                                    fimDeJogo();
                                    resolve(2); //retorna que o jogo acabou
                                    return
                                }
                            }
                        }
                    }
                } else {
                    for (let i = elem.length - 1; i >= 0; i--) {
                        for (let j = elem[i].length - 1; j >= 0; j--) {
                            if (elem[i][j]) {

                                if (window.getComputedStyle(table.rows[(alturaTable - 1) - qtyRows].cells[j]).getPropertyValue("background-color") != 'rgb(255, 255, 255)') {
                                    fimDeJogo();
                                    resolve(2); //retorna que o jogo acabou
                                    return
                                }
                            }
                        }
                    }
                }
            }



            if (goDown) {
                let lastLine = elem.length - 1;
                for (let j = 0; j < elem[lastLine].length; j++) { //percorre as colunas na última linha do elemento
                    if (elem[lastLine][j]) { // verifica se existe o 1 no elemento
                        //verifica se linha já está preenchida ou se está em um local que já não pertence a tabela
                        if ((table.rows[lastLine + qtyRows] == undefined) || (table.rows[lastLine + qtyRows].cells[j + currentCol] == undefined) || (window.getComputedStyle(table.rows[lastLine + qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)')) {
                            resolve(0);
                            return
                        }
                    } else {
                        for (let i = lastLine; i > 0; i--) { //percorre a linha do elememento
                            if (elem[i][j]) { //verifica se alguma das células não iriam ocupar um lugar já preenchido
                                if ((table.rows[lastLine + qtyRows] == undefined) || (table.rows[lastLine + qtyRows].cells[j + currentCol] == undefined) || (window.getComputedStyle(table.rows[i + qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)')) {
                                    resolve(0);
                                    return
                                }
                            } else { //percorre a coluna do elemento que não tem a célula preenchida, para verificar se algum desses elementos que se estieverem preenchidos não vão ocupar um lugar já preenchido
                                for (let k = 0; k < elem.length; k++) {
                                    if (elem[k][j]) {
                                        if ((table.rows[lastLine + qtyRows] == undefined) || (table.rows[lastLine + qtyRows].cells[j + currentCol] == undefined) || (window.getComputedStyle(table.rows[k + qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)')) {
                                            resolve(0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else { //as linhas a seguir são bem parecidas com o do if, entretanto as verificações são feitas para quando o elemento está subindo. 
                let lastLine = elem.length - 1;
                for (let j = elem[lastLine].length - 1; j >= 0; j--) {
                    if (elem[lastLine][j]) {
                        if (((alturaTable - 1) - lastLine - qtyRows < 0) || (window.getComputedStyle(table.rows[(alturaTable - 1) - lastLine - qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)')) {
                            resolve(0);
                            return
                        }
                    } else {
                        for (let i = lastLine; i > 0; i--) {
                            if (elem[i][j]) {
                                if ((window.getComputedStyle(table.rows[(alturaTable - 1) - i - qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)')) {
                                    resolve(0);
                                    return
                                }
                            } else {
                                for (let k = 0; k < elem.length; k++) {
                                    if (elem[k][j]) {
                                        if ((window.getComputedStyle(table.rows[(alturaTable - 1) - k - qtyRows].cells[j + currentCol]).getPropertyValue("background-color") != 'rgb(255, 255, 255)')) {
                                            resolve(0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            resolve(1);
        }, speed); //executa de acordo com o tempo de jogo
    });
}

//a seguinte função printa na tela o novo elemento
function printTable(elem, table, color, qtyRows, goDown) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (goDown) {
                if (qtyRows > 0) {
                    for (let i = 0; i < elem.length; i++) {
                        for (let j = 0; j < elem[i].length; j++) {
                            if (elem[i][j]) {
                                table.rows[i + qtyRows - 1].cells[j + currentCol].style.backgroundColor = "white";
                            }
                        }
                    }
                }
                for (let i = 0; i < elem.length; i++) {
                    for (let j = 0; j < elem[i].length; j++) {
                        if (elem[i][j]) {
                            table.rows[i + qtyRows].cells[j + currentCol].style.backgroundColor = color;
                        }
                    }
                }
            } else {
                if (qtyRows > 0) {
                    for (let i = elem.length - 1; i >= 0; i--) {
                        for (let j = elem[i].length - 1; j >= 0; j--) {
                            if (elem[i][j]) {
                                table.rows[(alturaTable - 1) - i - qtyRows + 1].cells[j + currentCol].style.backgroundColor = 'white';
                            }
                        }
                    }
                }
                for (let i = elem.length - 1; i >= 0; i--) {
                    for (let j = elem[i].length - 1; j >= 0; j--) {
                        if (elem[i][j]) {
                            table.rows[(alturaTable - 1) - i - qtyRows].cells[j + currentCol].style.backgroundColor = color;
                        }
                    }
                }

            }

            resolve(1);

        }, 1);
    });
}

//faz a verificação de quando o elemento para, se ele terminou uma linha
function checkLine(line, table, goDown) {
    return new Promise(resolve => {
        setTimeout(() => {

            let fullRows = []; //guarda as linhas completas
            //próximas linhas verificam e guardam as linhas completas
            for (let i = 0; i < table.rows.length; i++) {
                let isFull = 1;
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    if (window.getComputedStyle(table.rows[i].cells[j]).getPropertyValue("background-color") == 'rgb(255, 255, 255)') {
                        isFull = 0;
                    }
                }
                if (isFull) {
                    fullRows.push(i);
                }
            }
            if (alturaTable > 20) {
                CELLSIZE = '1px';
            }
            if (goDown) { //elimina as linhas e adiciona as novas para que a tabela continue do mesmo tamanho
                for (let index = 0; index < fullRows.length; index++) {
                    table.rows[fullRows[index]].remove();
                    let row = table.insertRow(0);
                    for (let i = 0; i < larguraTable; i++) {
                        let cell = row.insertCell(i);
                        cell.style.backgroundColor = 'white';
                        cell.style.height = CELLSIZE;
                        cell.style.width = CELLSIZE;
                    }
                }
            } else { //as linhas a seguir são bem parecidas com o do if, entretanto as verificações são feitas para quando o elemento está subindo. 
                for (let index = 0; index < fullRows.length; index++) {
                    table.rows[fullRows[index] - index].remove();
                    let row = table.insertRow((alturaTable - 1));
                    for (let i = 0; i < larguraTable; i++) {
                        let cell = row.insertCell(i);
                        cell.style.backgroundColor = 'white';
                        cell.style.height = CELLSIZE;
                        cell.style.width = CELLSIZE;
                    }
                }
            }

            //as linhas a seguir setam os valores na tela, com as informações para o usuário
            let pontuacao = document.getElementById('pontuacao');
            let nivel = document.getElementById('nivel');
            let linhas = document.getElementById('linhas');

            pontuacao.innerText = parseInt(pontuacao.innerText) + (fullRows.length * 10) * (fullRows.length);
            linhas.innerText = parseInt(linhas.innerText) + (fullRows.length);
            nivel.innerText = Math.trunc(parseInt(pontuacao.innerText) / 300);

            if ((800 - (Math.trunc(parseInt(pontuacao.innerText) / 300) * 70)) > 0) {
                speed = 800 - (Math.trunc(parseInt(pontuacao.innerText) / 300) * 70)
            }
            if (fullRows.length == 0) {
                resolve(0);
            } else {
                resolve(1);
            }
        }, 1);
    });
}

//função para disparar o relógio
//display é o elemento em html
function startTimer(display) {
    let second = 0;
    let minute = 0;
    let hour = 0;

    let refreshId = setInterval(function() {
        second++;
        if (second == 60) {
            second = 0;
            minute++;
        }
        if (minute == 60) {
            minute = 0;
            hour++;
        }

        display.innerText = `${hour}:${minute<10?'0'+minute:minute}:${second<10?'0'+second:second}`;

        if (isRunning == 0) { //verifica se o jogo não está rodando, para sair da função
            clearInterval(refreshId);
        }

    }, 1000);
}

//zera os valores do painel
function zerarValores(larg, alt) {
    document.getElementById('pontuacao').innerText = "0";
    document.getElementById('nivel') = "0";
    document.getElementById('linhas') = "0";
    document.getElementById('time') = "00:00";
}


//função para mudar os elemento de lado
function changeLeftRight(table, elem, qtyRows, color, direction, goDown) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (direction == 1) { //lado direito
                if ((currentCol) > (table.rows.length - 1)) { //verifica se as linhas não vai ultrapassar a tabela
                    resolve(0)
                    return;
                } else {
                    for (let i = 0; i < elem.length; i++) { //faz a verificação se a última coluna não possui elemento que irá sair da tabela
                        if ([currentCol + elem[i].length - 1 + 1] > (table.rows[qtyRows].cells.length - 1)) {
                            resolve(0)
                            return;
                        }
                    }
                }
                // as próximas iterações fazem as verificações se não existe elementos que já ocupam a tabela para a direita
                for (let i = 0; i < elem.length; i++) {
                    if (elem[i][elem[i].length - 1]) {
                        if (window.getComputedStyle(table.rows[goDown ? i + qtyRows : (alturaTable - 1) - i - qtyRows].cells[elem[i].length - 1 + currentCol + 1]).getPropertyValue("background-color") != 'rgb(255, 255, 255)') {
                            resolve(0)
                            return;
                        }

                    }
                }
            } else { //são feitas as mesma verificações para o lado esquerdo, entretanto, não é necessário verificar todas as colunas do lado esquerdo, devido sempre ter algum elemento preenchido na primeira coluna
                if ((currentCol - 1) < 0) {
                    resolve(0)
                    return;
                }
                for (let i = 0; i < elem.length; i++) {
                    if (elem[i][0]) {
                        if (window.getComputedStyle(table.rows[goDown ? i + qtyRows : (alturaTable - 1) - i - qtyRows].cells[0 + currentCol - 1]).getPropertyValue("background-color") != 'rgb(255, 255, 255)') {
                            resolve(0)
                            return;
                        }

                    }
                }
            }
            if (goDown) {
                //limpa as células do elemento anterior
                for (let i = 0; i < elem.length; i++) {
                    for (let j = 0; j < elem[i].length; j++) {
                        if (elem[i][j]) {
                            table.rows[i + qtyRows].cells[j + currentCol].style.backgroundColor = 'white';
                        }
                    }
                }
                //printa o elemento na nova linha
                for (let i = 0; i < elem.length; i++) {
                    for (let j = 0; j < elem[i].length; j++) {
                        if (elem[i][j]) {
                            table.rows[i + qtyRows].cells[direction == 1 ? j + currentCol + 1 : j + currentCol - 1].style.backgroundColor = color;
                        }
                    }
                }
                direction == 1 ? currentCol++ : currentCol--
            } else { //as linhas a seguir são bem parecidas com o do if, entretanto as verificações são feitas para quando o elemento está subindo. 
                for (let i = 0; i < elem.length; i++) {
                    for (let j = 0; j < elem[i].length; j++) {
                        if (elem[i][j]) {
                            table.rows[(alturaTable - 1) - i - qtyRows].cells[j + currentCol].style.backgroundColor = 'white';
                        }
                    }
                }

                for (let i = 0; i < elem.length; i++) {
                    for (let j = 0; j < elem[i].length; j++) {
                        if (elem[i][j]) {
                            table.rows[(alturaTable - 1) - i - qtyRows].cells[direction == 1 ? j + currentCol + 1 : j + currentCol - 1].style.backgroundColor = color;
                        }
                    }
                }
                direction == 1 ? currentCol++ : currentCol--
            }
            resolve(1);
        }, 1);
    });
}




//gera a tabela de acordo com o tamanho escolhido
function generateTable(larg, alt, hideModal = false) {
    if (alturaTable > 20) {
        CELLSIZE = '1px';
    }
    let table = document.querySelector("#tabela");
    table.innerHTML = "";
    alturaTable = alt;
    larguraTable = larg;

    for (let index = 0; index < alturaTable; index++) {
        let row = table.insertRow();
        for (let index2 = 0; index2 < larguraTable; index2++) {
            let cell = row.insertCell();
            cell.style.backgroundColor = 'white';
            cell.style.height = CELLSIZE;
            cell.style.width = CELLSIZE;

        }
    }
    if (hideModal) {
        document.getElementById("gameSize").style.display = "none";
        const modal = document.getElementById("startGame");
        modal.style.display = "block";
    }
}

function reload() {
    location.reload();
}

function redirectLogin() {
    window.location.href = "index.html";
}




window.addEventListener('load', () => {
    const modal = document.getElementById("gameSize");
    modal.style.display = "block";
});

window.addEventListener("keydown", function(e) { //bloqueia o scroll com as teclas
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);



function fimDeJogo() { //mostra modal que o jogo acabou
    let pontuacao = document.getElementById('pontuacao').innerText;
    let nivel = document.getElementById('nivel').innerText;
    let linhas = document.getElementById('linhas').innerText;
    let timer = document.getElementById('time').innerText;
    $.post("script.php", `pontuacao=${pontuacao}&nivel=${nivel}&linhas=${linhas}&timer=${timer}`, function( data ) {
        console.log(data);
    });
    const modal = document.getElementById("fimDeJogo");
    modal.style.display = "block";
}

function init() { //inicia com o onload da página
    let table = document.querySelector("#tabela");

    generateTable(10, 20)

    //as linhas a seguir setam os valoes nas variáveis, depedendo a tecla apertada. Essas váriáveis sao usadas durante o jogo para executar as funções.
    document.addEventListener('keydown', async (key) => {
        switch (key.keyCode) {
            case 37: //esquerda
                change.push({
                    direction: 0
                })
                break;

            case 38: //cima
                rotate++;
                break;

            case 39: //direita
                change.push({
                    direction: 1
                })
                break;

            case 40: //baixo
                down++;
                break;
        }
    });
}




// a seguinte função é disparada quando o jogo é iniciado
async function jogar() {
    document.getElementById("startGame").style.display = "none";

    if (isRunning) {
        alert("O jogo está em andamento, espere acabar para iniciar outro");
        return;
    }
    generateTable(larguraTable, alturaTable); //gera a tabela de acordo com o atual selecionado
    isRunning = 1; // seta que está rodando
    display = document.getElementById('time');
    startTimer(display); //inicia o relógio


    let table = document.getElementById('tabela');
    let reverse = 1; //variavel que indica qual o sentido do jogo, 1 as peças caem e 0 as peças sobem
    const arrayUnic = [elem1, elem2, elem3, elem4, elem5, elem6, elem7] //vetor com todos os elementos
    let arrayElement = []; //vetor usado para o game executar
    arrayElement.push(Object.assign({}, arrayUnic[Math.floor(Math.random() * arrayUnic.length)])); //adiciona um elemento aleatóriamente
    for (let index = 0; index < arrayElement.length; index++) { //percorre o vetor de elementos
        for (let i = 0; i < alturaTable; i++) { //iteração da quantidade de vezes máxima que um elemento pode descer
            downResult = await downTable(arrayElement[index].elem, table, arrayElement[index].color, i, reverse); //guarda o resultado da função
            if (downResult == 1) { //o elemento pode descer

                await printTable(arrayElement[index].elem, table, arrayElement[index].color, i, reverse) //printa o elemento na linha abaixo
                let acabouLado = -1;
                let acabouDown = 0;

                for (let j = 0; j < down; j++) { //usado para descer os elementos quando apertado a seta para baixo
                    i++; //aumenta um nas linhas
                    auxSpeed = speed;
                    speed = 1;
                    downResult2 = await downTable(arrayElement[index].elem, table, arrayElement[index].color, i, reverse);
                    //as linhas a seguir fazem as mesmas verificações do if acima e zeram as variváveis caso saia do loop, para não deixar buffer
                    if (downResult2 == 1) {
                        await printTable(arrayElement[index].elem, table, arrayElement[index].color, i, reverse)
                    } else if (downResult2 == 2) { //jogo acabou
                        down = 0;
                        change = [];
                        rotate = 0;
                        speed = auxSpeed;
                        acabouDown = 1;
                        isRunning = 0;
                        return;
                    } else {
                        down = 0;
                        change = [];
                        rotate = 0;
                        speed = auxSpeed;
                        acabouDown = 1;
                        break;
                    }
                    speed = auxSpeed;
                }
                if (acabouDown) { //caso nao seja mais possível descer, acaba o loop do elemento
                    break;
                }
                down = 0;

                for (let j = 0; j < change.length; j++) { //as linhas a segurir executam os botões apertados para direita e esquerda
                    if (acabouLado == 0 && (change[j - 1].direction == change[j].direction)) {
                        continue;
                    }

                    acabouLado = await changeLeftRight(table, arrayElement[index].elem, currentLine, arrayElement[index].color, change[j].direction, reverse);
                }

                if (rotate > 0) { //rotaciona o elemento caso tenha apertado para cima
                    arrayElement[index].elem = await rotateElem(table, arrayElement[index].elem, currentLine, arrayElement[index].color, reverse);
                }

                change = [];
            } else if (downResult == 2) { //jogo acabou
                down = 0;
                change = [];
                isRunning = 0;
                rotate = 0;
                change = [];
                return;
            } else { //nao é possível descer o elemento, ele sai do loop para aparecer o próximo
                break;
            }

        }
        down = 0;
        //as linhas a seguir verificam se foi eliminado uma linha, e caso tenha sido elinada com o elemento 7, é rotacionado o tabuleiro
        if (await checkLine(1, table, reverse) && (arrayElement[index].elem == elem7.elem)) {
            reverse = reverse == 0 ? 1 : 0;
            rotateTable(table);
        }
        arrayElement.push(Object.assign({}, arrayUnic[Math.floor(Math.random() * arrayUnic.length)])); //adiciona um elemento aleatóriamente
        currentCol = 0;
    }
    isRunning = 0;

}
