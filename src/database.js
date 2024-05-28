import {createPool} from "mysql2/promise"

const pool = createPool ({
    host: 'localhost',
    port: '3306',
    user: 'usuario1',
    password: 'usuario1',
    database: 'proyectofinal'
});

export default pool;
