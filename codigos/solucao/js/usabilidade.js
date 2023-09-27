/******************************************************************************
 * Desenvolvedor: Wilton de Paula Filho (wiltonpaulafilho@gmail.com)
 * Última atualização: 18/04/16
 *****************************************************************************/

// Variaveis globais
// Funcoes para controlar a exibição do tooltip do campo de textos autor
var mostrarTooltip, ocultarTooltip; 
// Variavel para controlar o funcionamento da barra de progresso
var cronometroBusca;

// -----------------------------------------------------------------------------
// Código Jquery para controlar a visualização do tooltip do autor
// -----------------------------------------------------------------------------
$(document).ready(function(){
    mostrarTooltip = function (){
        $("[data-toggle='tooltip']").tooltip('show');
    };
    ocultarTooltip = function (){
        $("[data-toggle='tooltip']").tooltip('hide');
    };
});

// -----------------------------------------------------------------------------
// Descrição: Seleciona o campo de texto do autor e inseri o foco nele
// -----------------------------------------------------------------------------
function focarAutor() {
    // Usabilidade: recebe o focus para o usuário alterar o nome do autor incorreto
    document.getElementById("txtAutor").focus();
    // Usabilidade: seleciona o texto para acelerar a edição do texto
    document.getElementById("txtAutor").select();
}

// -----------------------------------------------------------------------------
// Descrição: Verifica se alguma informação (nome do autor e/ou assunto)
// foi inserido no formulario
// -----------------------------------------------------------------------------
function validarFormulario() {
    var nomeAutor = document.getElementById("txtAutor").value.trim();
    var assunto = document.getElementById("txtAssunto").value.trim();
    if ((nomeAutor === "") && (assunto === "")) 
        alert("Não foi informado nenhum AUTOR e/ou ASSUNTO. \nPara pesquisar informe pelo menos uma destas informações.");
    else if (nomeAutor !== "") validarAutor();
         else acionarPesquisarCancelar();
}

// -----------------------------------------------------------------------------
// Descrição: Verifica se no campo AUTOR foi digitada alguma informacao 
// valida (espaço em branco, letras e ;)
// -----------------------------------------------------------------------------
function validarAutor() {
    var nomeAutor = document.getElementById("txtAutor").value;
    //Usabilidade: expressão regular p/ validar o nome do(s) autor(es) com apenas letras, espaço em branco e ponto e vírgula
    var validacaoAutor = /^[a-z ;\u00C0-\u00FF]{1,}$/i;
    if (!validacaoAutor.test(nomeAutor)) { 
        alert("Nome(s) do(s) autor(es) INVÁLIDO(S). \nInforme apenas letras, espaços em branco e ponto e vígula.\n");
        //Usabilidade: Ao termino da pesquisa o cursor ira focar o campo autor
        focarAutor();
        //Usabilidade: Mostrar tooltip com informações de ajuda de preenchimento do campo quando usuario entrar com formato diferente do esperado
        mostrarTooltip();
    }
    else {
        ocultarTooltip();
        acionarPesquisarCancelar();
    }
}

// -----------------------------------------------------------------------------
// Descrição: Altera o rótulo do botao "Pesquisar" para "Cancelar" e 
// vice-versa e a cor de fundo. Além disso, oculta/exibe a barra de progresso.
// Parametros:
//  label: novo texto do botao
//  corFundo: nova cor de fundo do botao
// -----------------------------------------------------------------------------
function alterarConfigBotao(label, corFundo) {
    // Usabilidade: altera o texto e a cor do botao Pesquisar 
    document.getElementById("lbPesquisar").innerHTML = label;
    document.getElementById("btnPesquisar").style.backgroundColor = corFundo;
    if (label == "Pesquisar") //Oculta a barra de progresso. Parar cronometro
        document.getElementById("boxProgressBar").style.display = "none";
    else  //Mostra a barra de cronometro.
        document.getElementById("boxProgressBar").style.display = "block";
}

// -----------------------------------------------------------------------------
// Descrição: analisa qual funcionalidade do botão (pesquisar/cancelar)
// deve ser acionada.
// -----------------------------------------------------------------------------
function acionarPesquisarCancelar() {
    var acao = document.getElementById("lbPesquisar").innerHTML;
    switch (acao) {
        case "Pesquisar":
            alterarConfigBotao("Cancelar", "red");
            iniciarCronometro();
        break;
        case "Cancelar":
            //Usabilidade: Impedir que o usuario cancele uma busca acidentalmente
            if (confirm("Deseja finalizar a busca?")) {
                alterarConfigBotao("Pesquisar", "rgb(51,122,183)");
                pararCronometro();
            }
            focarAutor();
        break;
    }
}

// -----------------------------------------------------------------------------
// Descrição: Parar (stop) o cronometro que controla a barra de progresso
// do botao pesquisar.
// -----------------------------------------------------------------------------
function pararCronometro() {
    document.getElementById("progressBar").style.width = "0%";
    clearTimeout(cronometroBusca);
}

// -----------------------------------------------------------------------------
// Descrição: Iniciar (start) o cronometro que controla a barra de progresso
// do botao pesquisar.
// -----------------------------------------------------------------------------
function iniciarCronometro() {
    var largura = document.getElementById("progressBar").style.width.match(/\d/g).join("");
    if (largura <= 100) {
        document.getElementById("progressBar").style.width = (parseInt(largura) + 1) + "%";
        document.getElementById("progressBar").innerHTML = largura + "%";
        cronometroBusca = setTimeout("iniciarCronometro()",100);
    }
    else {
        alert("Nenhum item foi encontrado!")
        //Usabilidade: Ao termino da pesquisa o cursor ira focar o campo autor
        focarAutor();
        alterarConfigBotao("Pesquisar", "rgb(51,122,183)");
        pararCronometro();
    }             
}