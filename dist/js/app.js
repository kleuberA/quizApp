import { Quiz } from './models/quiz.js';
const quiz = new Quiz();
let cont = 0;
let elementoIconCorrect = document.createElement('span');
elementoIconCorrect.classList.add('material-icons-outlined');
elementoIconCorrect.innerHTML = 'check_circle';
let elementoIconIncorrect = document.createElement('span');
elementoIconIncorrect.classList.add('material-icons-outlined');
elementoIconIncorrect.innerHTML = 'cancel';
$(function () {
    $('.question').text(quiz.questoes[0].question);
    $('.optionA').text('A ' + quiz.questoes[0].answers.a);
    $('.optionB').text('B ' + quiz.questoes[0].answers.b);
    $('.optionC').text('C ' + quiz.questoes[0].answers.c);
    $('.optionD').text('D ' + quiz.questoes[0].answers.d);
    $('.next').attr('disabled', 'disabled');
});
$('.next').on('click', (event) => {
    cont++;
    $('.next').attr('disabled', 'disabled');
    if (cont < quiz.questoes.length) {
        setTimeout(() => {
            proximaQuestão(cont);
        }, 500);
        $('.list-group-item').each((index, el) => {
            if (el.classList.contains('disabled') || el.classList.contains('alternativaIncorreta') || el.classList.contains('alternativaCorreta')) {
                el.classList.remove("disabled");
                el.classList.remove("alternativaIncorreta");
                el.classList.remove("alternativaCorreta");
            }
        });
    }
    else {
        mostraResultados();
    }
});
let quantidadeDeAcertos = 0;
$('.list-group-item').on('click', (event) => {
    event.target.classList.add("selecionado");
    $('.next').prop("disabled", false);
    let alternativaEscolhida = event.target.getAttribute('data-alternativa');
    verificaQuestaoCorreta(event, alternativaEscolhida);
});
$('.tryAgain').click(event => {
    cont = 0;
    quantidadeDeAcertos = 0;
    proximaQuestão(cont);
    modificaDisplayElemento('flex', 'none', 'inline');
    $('.list-group-item').removeClass('alternativaIncorreta');
    $('.list-group-item').each((index, el) => {
        if (el.classList.contains('disabled')) {
            el.classList.remove('disabled');
            el.classList.remove('alternativaCorreta');
        }
    });
});
function verificaQuestaoCorreta(event, alternativaEscolhida) {
    $('.list-group-item').each((index, el) => {
        if (!el.classList.contains('disabled')) {
            el.classList.add("disabled");
        }
        if (alternativaEscolhida != quiz.questoes[cont].correctAnswer) {
            event.target.classList.add('alternativaIncorreta');
            event.target.append(elementoIconIncorrect);
            if (el.getAttribute('data-alternativa') == quiz.questoes[cont].correctAnswer) {
                el.classList.add('alternativaCorreta');
                el.append(elementoIconCorrect);
            }
        }
        else {
            event.target.classList.add('alternativaCorreta');
            event.target.append(elementoIconCorrect);
        }
    });
    if (alternativaEscolhida == quiz.questoes[cont].correctAnswer) {
        quantidadeDeAcertos++;
    }
}
function modificaDisplayElemento(valorArgumento, segundoArgumento, terceiroArgumento) {
    $('.containerQuizOptions').css('display', valorArgumento);
    $('.nextQuiz').css('display', valorArgumento);
    $('.containerQuizFinally').css('display', segundoArgumento);
    $('.imageQuestions').css('display', terceiroArgumento);
}
function mostraResultados() {
    $('.quantidadeCorretasValor').text(quantidadeDeAcertos);
    $('.containerQuiz').prepend($('.containerQuizFinally'));
    modificaDisplayElemento('none', 'flex', 'none');
    if (quantidadeDeAcertos >= 2) {
        $('.quantidadeCorretasValor').addClass('valorAcertosSuccess');
    }
    else {
        $('.quantidadeCorretasValor').removeClass('valorAcertosSuccess');
    }
}
function proximaQuestão(cont) {
    $('.question').text(quiz.questoes[cont].question);
    $('.optionA').text('A ' + quiz.questoes[cont].answers.a);
    $('.optionB').text('B ' + quiz.questoes[cont].answers.b);
    $('.optionC').text('C ' + quiz.questoes[cont].answers.c);
    $('.optionD').text('D ' + quiz.questoes[cont].answers.d);
}
