import Login from '../models/loginModel.js';
import bcrypt from 'bcrypt'
import {generateToken,checkToken} from '../lib/token.js';





export default {
    async auth(req, res){
        const {email, password} = req.body;

        //valida se tem todos os parametros para logar 
        if (!email || !password) {
            return res.status(403).send({
                ok: false,
                message: 'missing parameter'
            });
        }

        Login.findOne({ where:{ email }})
        .then(async result=>{

            if (!result || !bcrypt.compareSync(password, result.password) ){
                return res.status(401).send({
                    ok: false,
                    message: 'unauthorized'
                });
            }

            result.password = undefined


            return res.status(200).send({
                ok: true,
                message: "login successful",
                result,
                token: generateToken({result}),
            });

        })

    }
}