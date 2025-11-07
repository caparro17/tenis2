const { query } = require('../config/db');
const executeQuery = require('../services/query');

const modelSenai = {

    //Registrar
    cadastrar: async (nome, marca, numero, tipo) => {
        try {
            return await executeQuery(`INSERT INTO tenis (nome, marca, numero, tipo) values (?,?,?,?)`, [nome, marca, numero, tipo])
        } catch (error) {
            throw error
        }
    },

    //Obter NIF
    consultarNumero: async (numero) => {
        try {
            return await executeQuery(`SELECT numero FROM tenis WHERE numero=?`, [numero]) 
        } catch (error) {
            throw error
        }   
    },

     //Listar 
    listar: async () => {
        try {
            return await executeQuery(`SELECT id, nome, marca, numero, tipo FROM tenis`)
        } catch (error) {
            throw error
        }
    },
   
    //Obter usuário por ID
    listarPorID: async (id) => {
       try {
            return await executeQuery(`SELECT nome, marca, nuemro, tipo FROM tenis WHERE id=?`, [id])
       } catch (error) {
            throw error
       }
    },

    //Atualizar
    atualizar: async (nome, marca, numero, tipo, id) => {
        try {
            return await executeQuery (`UPDATE tenis SET nome='${nome}', marca='${marca}', numero='${numero}',  tipo='${tipo}' WHERE id=${id};`)
        } catch (error) {
            throw error
        }
    },

    //Deletar
    deletar: async (id) => {
        try {
            return await executeQuery(`DELETE FROM tenis WHERE id=?`, [id])
        } catch (error) {
            throw error
        }
    },  
};

module.exports = modelSenai;
