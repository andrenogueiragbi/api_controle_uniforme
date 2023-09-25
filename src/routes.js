import express from 'express';
import users from './controllers/users.js';
import logins from './controllers/login.js';
import employee from './controllers/employee.js';
import country from './controllers/country.js';
import state from './controllers/state.js';
import city from './controllers/city.js';
import middlewares from './middlewares/index.js';

const version = '/v1'

const routes = express.Router();


routes.post(version+'/user/auth', logins.auth);

//rotas de usuários
routes.get(version+'/user/',middlewares, users.get);
routes.delete(version+'/user/:id', middlewares, users.delete);
routes.post(version+'/user/',middlewares, users.post);
routes.put(version+'/user/:id', users.update);

//rotas de funcionários
routes.get(version+'/employee/', employee.get);
routes.post(version+'/employee/', employee.post);


//rotas de pais
routes.get(version+'/country/',country.get)
routes.delete(version+'/country/:id', country.delete);
routes.post(version+'/country/',country.post)
routes.put(version+'/country/:id',country.update)


//rotas de estado
routes.get(version+'/state/',state.get)
//routes.delete(version+'/state/:id', state.delete);
routes.post(version+'/state/',state.post)
//routes.put(version+'/state/:id',state.update)

//rotas de estado
routes.get(version+'/city/',city.get)
//routes.delete(version+'/state/:id', state.delete);
routes.post(version+'/city/',city.post)
//routes.put(version+'/state/:id',state.update)



export { routes as default };