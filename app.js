const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors')
app.use(express.json());

const sequelize  = require('./models');


const routerUser = require('./routers/router_usuarios');
const routerCitas = require('./routers/router_citas');



//CORS
app.use(cors())
app.get('/', (req, res) => {
    res.send('proyecto backend sequelize mysql');
});


app.use('/usuario', routerUser);
app.use('/citas', routerCitas);

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log('Servidor levantado en' + PORT));
['unhandledRejection', 'uncaughtException'].forEach(event => process.on(event, (err) => {
    console.error(`unhandled error: ${err.stack || err}`);
}));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'citas_db',
    password: '12345678'
})
.then(() => console.log('Sequelize ON'))
.catch((error) => console.log('Sequelize OFF - ERROR CONECION', error));