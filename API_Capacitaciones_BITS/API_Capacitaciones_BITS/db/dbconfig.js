//obtener datos del archivo .env

const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });

//configurar base de datos
const config = {
    user: 'its-academy',
    password: 'Infinity01?',
    server: 'it-seekersdev.ddns.net', 
    database: 'BITS_Capacitaciones',
    port: 65535,
    synchronize: true,
    trustServerCertificate: true,
};

module.exports = config;

/* Para importar la conifguración en otro archivo */