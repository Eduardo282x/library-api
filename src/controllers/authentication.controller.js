import { getConnection }  from '../database/database'

const tableName = 'users'
const queryAuthenticate = `SELECT users.Id, users.Name, users.Lastname, users.Username, users.Password, users.Rol, roles.Rol as RolDes FROM users join roles on users.Rol = roles.IdRol`
const authenticateUser = async (req, res) =>{
    try {
        const { username, password } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`SELECT * FROM ${tableName} WHERE Username='${username}' and Password='${password}'`);
        if(result.length > 0){
            const user = await connection.query(`${queryAuthenticate} where Id = ${result[0].Id}`)
                res.json({message:'Bienvenido', success: true, userData: user[0]});
        } else {
            res.json({message:'Usuario no encontrado', success: false});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}

const changeDataUser = async (req, res) =>{
    try {
        const { Id, Password } = req.body;
        const connection = await getConnection();
        const result = await connection.query(`UPDATE ${tableName} set Password = '${Password}' where Id=${Id}`);
        res.json({message:'Contraseña cambiada', success: true,});
    }
    catch (err) {
        console.log(err);
        res.status(500)
        res.send(err.message)
    }
}



export const methods = {
    authenticateUser,
    changeDataUser,
};