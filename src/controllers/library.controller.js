import { getConnection }  from '../database/database'

const tableName = 'library'
const getLibrary = async (req, res) =>{
    const queryGetLibrary = `SELECT library.Id, users.Name, bookstest.Title, library.Amount FROM library join users on library.IdUser = users.Id join bookstest on library.IdBookTest = bookstest.Id`
    try {
        const connection = await getConnection();
        const result = await connection.query(queryGetLibrary);
        if(result){
            res.json({response: result, success: true});
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

const deleteLibrary = async (req, res) =>{
    try {
        const { Id } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`DELETE FROM ${tableName} WHERE Id='${Id}'`);
        if(result){
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
    deleteLibrary
};
