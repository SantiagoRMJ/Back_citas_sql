const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors')
app.use(express.json());
const routerUser = require('./routers/router_usuarios');
const routerCitas = require('./routers/router_citas');
const { sequelize } = require('./models');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'clinicaDental_db',
    password: '12345678'
})

//CORS
app.use(cors())

app.use('/usuario', routerUser);
app.use('/citas', routerCitas);

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> console.log('Servidor levantado en' + PORT));
['unhandledRejection', 'uncaughtException'].forEach(event => process.on(event, (err) => {
    console.error(`unhandled error: ${err.stack || err}`);
}));