import { getConnection }  from '../database/database'

const tableName = 'library';
const tableNameBooks = 'bookstest';
const getLibrary = async (req, res) =>{
    const queryGetLibrary = `SELECT library.Id, users.Name, bookstest.Title FROM library join users on library.IdUser = users.Id join bookstest on library.IdBookTest = bookstest.Id`
    try {
        const connection = await getConnection();
        const result = await connection.query(queryGetLibrary);
        if(result){
            res.json({response: result});
        } else {
            res.json({response:'Ha ocurrido un error inesperado.', success: false});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const addLibrary = async (req, res) =>{
    const queryAdd = `INSERT INTO ${tableName} (IdUser, IdBookTest) VALUES `;
    const queryLibrary = `SELECT * FROM  ${tableNameBooks} `;
    try {
        const { IdUser, IdBookTest } = req.body;
        const connection = await getConnection();
        const reserve =  await connection.query(`${queryLibrary} WHERE Id='${IdBookTest}'`);
        // console.log(reserve);
        if(reserve && reserve.length> 0){
            const substra =  await connection.query(`UPDATE ${tableNameBooks} SET AmountAvalible = '${reserve[0].AmountAvalible - 1 }'  WHERE Id='${IdBookTest}'`);
        }
        const result = await connection.query(`${queryAdd} ('${IdUser}', '${IdBookTest}')`);
        if(result){
            res.json({message:'Reserva Agredada.', success: true,});
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
const deleteLibrary = async (req, res) =>{
    try {
        const { Id } = req.body;
        const connection = await getConnection();
        const getLibrary = await connection.query(`SELECT * FROM ${tableName} WHERE Id='${Id}'`);
        if(getLibrary){
            const amountBook = getLibrary[0];
            const getBookstets = await connection.query(`SELECT * FROM ${tableNameBooks} WHERE Id='${amountBook.IdBookTest}'`);
            const updateAmountAvalible = await connection.query(`UPDATE ${tableNameBooks} SET AmountAvalible = '${getBookstets[0].AmountAvalible + 1}' WHERE Id = ${getBookstets[0].Id}`);
            const result = await connection.query(`DELETE FROM ${tableName} WHERE Id='${Id}'`);
            console.log('Libro Arreglo: ',getLibrary);
            console.log('Libro Solo: ',amountBook);
            console.log('',getBookstets);

        }
        if(getLibrary){
            res.json({message:'Reserva Eliminado.', success: true,});
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
    getLibrary,
    addLibrary,
    deleteLibrary
};
