var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.get('/ultimas/:idPaciente', function(req, res, next) {
	
	// quantas são as últimas leituras que quer? 7 está bom?
	const limite_linhas = 7;

	var idPaciente = req.params.idPaciente;

	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		temperatura, 
		umidade, 
		momento,
		DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
		from leitura
		where fkPaciente = ${idPaciente}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		temperatura, 
		umidade, 
		momento,
		FORMAT(momento,'HH:mm:ss') as momento_grafico
		from leitura
		where fkPaciente = ${idPaciente}
		order by idPaciente desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/tempo-real/:idPaciente', function(req, res, next) {
	console.log('Recuperando paciente');
	
	//var idPaciente = req.body.idPaciente; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idPaciente = req.params.idPaciente;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select temperatura, umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, fkPaciente from leitura where fkPaciente = ${idPaciente} order by id desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 1 temperatura, umidade, FORMAT(momento,'HH:mm:ss') as momento_grafico, fkPaciente from leitura where fkPaciente = ${idPaciente} order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select top 1
	nome, max(temperatura) as temp_maxima
   from leitura join paciente on idPaciente = fkPaciente and momento > GETDATE()-0.2 group by nome ;`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});



router.get('/estatisticas2', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select top 1
	nome, min(temperatura) as temp_min
   from leitura join paciente on idPaciente = fkPaciente and momento > GETDATE()-0.2 group by nome ;`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});

router.get('/estatisticas3/:idPaciente', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);
	var idPaciente = req.params.idPaciente;

	const instrucaoSql = `select top 1
	nome, min(temperatura) as temp_min
   from leitura join paciente on idPaciente = fkPaciente and momento > GETDATE()-0.2 where idPaciente = ${idPaciente} group by nome ;`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});

router.get('/estatisticas4/:idPaciente', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);
	var idPaciente = req.params.idPaciente;

	const instrucaoSql = `select top 1
	nome, max(temperatura) as temp_max
   from leitura join paciente on idPaciente = fkPaciente and momento > GETDATE()-0.2 where idPaciente = ${idPaciente} group by nome ;`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});

router.get('/estatisticas5/:idPaciente', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);
	var idPaciente = req.params.idPaciente;

	const instrucaoSql = `select top 1
	nome, avg(temperatura) as temp_med
   from leitura join paciente on idPaciente = fkPaciente and momento > GETDATE()-0.2 where idPaciente = ${idPaciente} group by nome ;`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});



router.get('/qualquernome/:fkPaciente', function(req, res, next) {
	console.log('Recuperando paciente');
	
	//var idPaciente = req.body.idPaciente; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idPaciente = req.params.fkPaciente;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select temperatura, umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, fkPaciente from leitura where fkPaciente = ${idPaciente} order by id desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select p.nome, p.sexo, p.grauAutismo, l.temperatura, FORMAT(l.momento,'HH:mm:ss') as momento_grafico from paciente p JOIN leitura l on fkPaciente = idPaciente where fkPaciente = ${idPaciente} order by idLeitura desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


module.exports = router;
