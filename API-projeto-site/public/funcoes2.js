let crm_medico;
let email_medico;
let profissao_medico;
let nome_medico;
let dataNasc_medico;
let sexo_medico;


function redirecionar_login() {
    window.location.href = 'loginmedico.html';
}

function verificar_autenticacao() {
    
    email_medico = sessionStorage.email_medico_meuapp;
    nome_medico = sessionStorage.nome_medico_meuapp;
    dataNasc_medico = sessionStorage.dataNasc_medico_meuapp;
    sexo_medico = sessionStorage.sexo_medico_meuapp;
    crm_medico = sessionStorage.crm_medico_meuapp;
    profissao_medico = sessionStorage.profissao_medico_meuapp;

    
    if (crm_medico == undefined)  {
        redirecionar_login();
    } else {
        nome_b.innerHTML = nome_medico;
        espec_b.innerHTML = profissao_medico;
        crm_b.innerHTML = crm_medico

        

        validar_sessao();
    }
    
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/medicos/sessao/${crm_medico}`, {cache:'no-store'})
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
    fetch(`/medicos/sair/${crm_medico}`, {cache:'no-store'}); 
}