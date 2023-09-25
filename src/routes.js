import express from 'express';
import users from './controllers/users.js';
import logins from './controllers/login.js';
import employee from './controllers/employee.js';
import middlewares from './middlewares/index.js';


const routes = express.Router();


routes.post('/user/auth', logins.auth);

routes.get('/user/', users.get);
routes.post('/user/', users.post);
routes.delete('/user/:id', middlewares, users.delete);
routes.put('/user/:id', users.update);

routes.get('/employee/', employee.get);
routes.post('/employee/', employee.post);


export { routes as default };