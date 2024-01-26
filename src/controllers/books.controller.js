import { getConnection }  from '../database/database'

const tableName = 'bookstest'
const getAll = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName}`);
        res.json({response: result});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}
const getBooks = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName} WHERE IsBook = 1`);
        res.json({response: result});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}
const getThesis = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName} WHERE IsBook = 0`);
        res.json({response: result});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const addBooksThesis = async (req, res) =>{
    const queryAdd = `INSERT INTO ${tableName} (Title, Author, Age, Amount, AmountAvalible, IsBook) VALUES`
    try {
        const { Title, Author, Age, Amount, IsBook } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} ('${Title}','${Author}','${Age}','${Amount}','${Amount}','${IsBook}')`);
        if(result){
            res.json({message:'Usuario Agregado.', success: true,});
        } else {
            res.json({message:'Ha ocurrido un error inesperado.', success: false,});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const editBooksThesis = async (req, res) =>{
    try {
        const { Id, Title,Author,Age,Amount } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ${tableName} set Title='${Title}', Author='${Author}', Age='${Age}', Amount='${Amount}' WHERE Id= '${Id}'`);
        if(result){
            res.json({message:'Usuario Actualizado.', success: true,});
        } else {
            res.json({message:'Ha ocurrido un error inesperado.', success: false,});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}
const deleteBooksThesis = async (req, res) =>{
    try {
        const { Id } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`DELETE FROM ${tableName} WHERE Id='${Id}'`);
        if(result){
            res.json({message:'Usuario Eliminado.', success: true,});
        } else {
            res.json({message:'Ha ocurrido un error inesperado.', success: false,});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}



export const methods = {
    getAll,
    getBooks,
    getThesis,
    addBooksThesis,

    editBooksThesis,
    deleteBooksThesis,
};