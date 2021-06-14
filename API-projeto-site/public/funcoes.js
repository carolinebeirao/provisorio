let email_paciente;
let nome_paciente;
let dataNasc_paciente;
let sexo_paciente;
let autismo_paciente;

function redirecionar_login() {
    window.location.href = 'login.html';
}

function verificar_autenticacao() {
    email_paciente = sessionStorage.email_paciente_meuapp;
    nome_paciente =  sessionStorage.nome_paciente_meuapp;
    dataNasc_paciente =  sessionStorage.dataNasc_paciente_meuapp;
    sexo_paciente = sessionStorage.sexo_paciente_meuapp;
    autismo_paciente = sessionStorage.autismo_paciente_meuapp;
    idPaciente_paciente = sessionStorage.idPaciente_paciente_meuapp;

    
    if (email_paciente == undefined)  {
        redirecionar_login();
    } else {
        b_usuario.innerHTML = nome_paciente;
        b_data.innerHTML = dataNasc_paciente;
        b_sexo.innerHTML = sexo_paciente;
        grau.innerHTML = autismo_paciente;

        

        validar_sessao();
    }
    
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/pacientes/sessao/${email_paciente}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/pacientes/sair/${email_paciente}`, {cache:'no-store'}); 
}