var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var medico = require('../models').medico;


let sessoes = [];

/* Recuperar médico por CRM e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por email e senha');

	var crm = req.body.crm; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `select * from medico where crm='${crm}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: medico
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.crm);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('CRM e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo CRM e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar médico */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	console.log(new Date());
	console.log('dados', req.body)
	medico.create({
		nome: req.body.nome,
		email: req.body.email,
		senha: req.body.senha,
		crm: req.body.crm,		
		sexo: req.body.sexo,
		profissao: req.body.profissao,
		dataNasc: req.body.dataNasc,
		estado: req.body.estado,
		cidade: req.body.cidade,
		cep: req.body.cep,
		bairro: req.body.bairro,		
		rua: req.body.rua,
		numero: req.body.numero,
		complemento: req.body.complemento

	})
	

	.then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
		

    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);


  	});
});




/* Verificação de médico */
router.get('/sessao/:crm', function(req, res, next) {
	let crm = req.params.crm;
	console.log(`Verificando se o usuário ${crm} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == crm) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${crm} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de médico */
router.get('/sair/:crm', function(req, res, next) {
	let crm = req.params.crm;
	console.log(`Finalizando a sessão do usuário ${crm}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != crm) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${crm} finalizada com sucesso!`);
});


/* Recuperar todos os médicos */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os médicos');
	medico.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

function agora() {
	const agora_d = new Date();
	return `${agora_d.getFullYear()}-${agora_d.getMonth() + 1}-${agora_d.getDate()}`;
}

module.exports = router;
