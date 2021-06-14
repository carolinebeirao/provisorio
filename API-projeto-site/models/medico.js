	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes,) => {
    let medico = sequelize.define('medico',{
		idMedico: {
			field: 'idMedico',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		crm: {
			field: 'crm',
			type: DataTypes.CHAR(11),
			allowNull: false
		},
		
		sexo: {
			field: 'sexo',
			type: DataTypes.STRING,
			allowNull: false
		},

		dataNasc:{
            field: 'dataNasc',
            type: DataTypes.DATEONLY,
            allowNull: true,
            
        },
		
		profissao:{
			field: 'profissao',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		
		updatedAt:{
			field: 'updatedAt',
			defaultValue: data(),
			type: DataTypes.DATE,
			allowNull: false
		},
		createdAt:{
			field: 'createdAt',
			defaultValue: data(),
			type: DataTypes.DATE,
			allowNull: false
		},
		estado: {
			field: 'estado',
			type: DataTypes.STRING,
			allowNull: false
		},
		cidade: {
			field: 'Cidade',
			type: DataTypes.STRING,
			allowNull: false
		},
		cep: {
			field: 'cep',
			type: DataTypes.STRING,
			allowNull: false
		},
		bairro: {
			field: 'bairro',
			type: DataTypes.STRING,
			allowNull: false
		},
		
		rua: {
			field: 'rua',
			type: DataTypes.STRING,
			allowNull: false
		},

		numero:{
            field: 'numero',
            type: DataTypes.STRING,
            allowNull: true,
            
        },
		
		complemento:{
			field: 'complemento',
			type: DataTypes.STRING,
			allowNull: false
		}


	}, 
	{
		tableName: 'medico', 
		freezeTableName: true, 
		underscored: true,
		timestamps: true,
		

	});


    return medico;
};

function data(){
	var dataAtual = new Date();
	dataAtual.setHours(dataAtual.getHours()-3)
	return dataAtual;
}
