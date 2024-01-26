import { getConnection }  from '../database/database'

const tableName = 'users'
const getUsers = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT Id, Name, Lastname, Username FROM ${tableName} WHERE Rol = '2'`);
        res.json({response: result});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const addUsers = async (req, res) =>{
    const queryAdd = `INSERT INTO ${tableName} (Name, Lastname, Username, Password, Rol) VALUES`
    try {
        const { Name, Lastname, Username } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`${queryAdd} ('${Name}', '${Lastname}', '${Username}', 123, 2)`);
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
const editUsers = async (req, res) =>{
    try {
        const { Id, Name, Lastname, Username } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ${tableName} set Name='${Name}', Lastname='${Lastname}', Username='${Username}' WHERE Id=${Id}`);
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
const deleteUsers = async (req, res) =>{
    try {
        const { Id } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`DELETE FROM ${tableName} WHERE Id=${Id}`);
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
    getUsers,
    addUsers,
    editUsers,
    deleteUsers,
};