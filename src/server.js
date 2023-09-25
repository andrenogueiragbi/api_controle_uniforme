import express from 'express';
import routes from './routes.js';
import db from './database/index.js';
import nodemon from 'nodemon';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors())
app.use(morgan('combined'));





db.sync( () => 
    console.log(`Banco de dados conectado: clientes`)
);
 
app.listen(3000, () => 
    console.log(` 👉 Servidor run port ${process.env.PORT} 🔵`)
);

