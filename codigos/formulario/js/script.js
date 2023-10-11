var periodo = document.getElementById("selPeriodo");

window.onload = function () {
    document.getElementById("txtPrimNome").focus();
}

var altura = document.getElementById("txtAltura");
var peso = document.getElementById("txtPeso");

var disciplina = document.getElementById("selDisciplina");

altura.addEventListener("blur",calcularIMC);
peso.addEventListener("blur",calcularIMC);

function calcularIMC() {
    if (altura.value != "" && peso.value != "")
        document.getElementById("txtIMC").value = peso.value/(altura.value*altura.value);
}

periodo.addEventListener("change", exibirDisciplinas);
var disciplinas = [
    ["Projeto Website Estático 1", "Projeto Website Estático 2"],
    ["Projeto Website Estático 3", "Projeto Website Estático 4"]
];
function exibirDisciplinas() {
    var periodoSel = document.getElementById("selPeriodo").value;
    var selectElement = document.getElementById("selDisciplinas");

    // while (selectElement.firstChild) {
    //     selectElement.removeChild(selectElement.firstChild);
    // }

    for (i=0; i<2; i++) {
        const option = document.createElement("option");
        option.textContent = disciplinas[periodoSel][i];
        document.getElementById("selDisciplina").appendChild(option);
    }
}
