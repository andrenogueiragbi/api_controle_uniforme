import Login from '../models/loginModel.js';
import checkParameter from '../lib/checkParameter.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config();

const salt = bcrypt.genSaltSync();

export default {

    async get(req, res) {
        await Login.findAll({ attributes: ['id', 'name', 'email', 'type', 'active', 'createdAt', 'updatedAt'] })
            .then(result => {

                return res.status(200).send({
                    ok: true,
                    message: 'search success',
                    result
                });

            }).catch(err => {

                return res.status(500).send({
                    ok: false,
                    message: err
                });


            })
    },
    async delete(req, res) {

        const { id } = req.params

        //valida se existe parametro e se é número
        if (!id || isNaN(id)) {
            return res.status(403).send({
                ok: false,
                message: `missing parameter or ${id} not number`
            });
        }

        //valida se existe usaurio é master
        if (!req.type_user || req.type_user != 'master') {
            return res.status(403).send({
                ok: false,
                message: `your type user is not permitted delete`
            });
        }

        //valida se existe usaurio é master
        if (id == 1) {
            return res.status(403).send({
                ok: false,
                message: `not permitted delete user start`
            });
        }




        Login.destroy({
            where: { id }
        }).then(result => {

            if (result) {
                return res.status(200).send({
                    ok: true,
                    message: `successful deletion id ${id}`,
                    result

                });

            } else {
                return res.status(403).send({
                    ok: false,
                    message: `failed deletion, not found id ${id}`,
                    result

                });

            }


        }).catch(err => {

            return res.status(500).send({
                ok: false,
                message: err
            });

        })


    },
    async post(req, res) {
        const { name, email, password, type } = req.body;

        console.log('>>>>>>>>>>>>', req.type_user)

        //valida se tem todos os parametros para salvar 
        if (!name || !email || !password) {
            return res.status(403).send({
                ok: false,
                message: 'missing parameter'
            });
        }

        //quando o email não é válido
        if (!checkParameter.email(email)) {
            return res.status(403).send({
                ok: false,
                message: `Email ${email} is invalid`
            });
        }

        //quando o senha não é válido
        if (!checkParameter.password(password)) {
            return res.status(403).send({
                ok: false,
                message: `The password needs to be longer than 8 characters and include at least one uppercase letter, one lowercase letter, and one special character.`
            });
        }

        //valida se usuario admin esta querendo criar master
        if (req.type_user == 'admin' && type == 'master') {
            return res.status(403).send({
                ok: false,
                message: `your type user is not permitted create master`
            });
        }

        Login.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt),
            type: req.type_user === 'master' ? !type ? 'admin' : type : 'admin',
            active: 'Y'
        }).then(result => {
            result.password = undefined
            return res.status(200).send({
                ok: true,
                message: 'successfully created',
                result
            });

        }).catch(err => {

            return res.status(500).send({
                ok: false,
                message: err
            });

        })

    },
    async update(req, res) {

        const { id } = req.params
        const { name, email, password, type, active } = req.body;

        //valida se existe parametro e se é número
        if (!id || isNaN(id)) {
            return res.status(403).send({
                ok: false,
                message: `missing parameter or ${id} not number`
            });
        }

        //quando o email não é válido
        if (email && !checkParameter.email(email)) {
            return res.status(403).send({
                ok: false,
                message: `Email ${email} is invalid`
            });
        }

        //quando o senha não é válido
        if (password && !checkParameter.password(password)) {
            return res.status(403).send({
                ok: false,
                message: `The password needs to be longer than 8 characters and include at least one uppercase letter, one lowercase letter, and one special character.`
            });
        }

        let objLogin = {
            name,
            email,
            type,
            type,
            active
        }

        if (!password) {
            Login.update(objLogin, { where: { id } })
                .then(result => {

                    if (result) {
                        return res.status(200).send({
                            ok: true,
                            message: `successful updation id ${id}`,
                            result: objLogin

                        });

                    } else {
                        return res.status(403).send({
                            ok: false,
                            message: `failed updation, not found id ${id}`,
                            result: objLogin

                        });

                    }


                }).catch(err => {

                    return res.status(500).send({
                        ok: false,
                        message: err
                    });

                })


        } else {

            objLogin['password'] = bcrypt.hashSync(password, salt)


            Login.update(objLogin, { where: { id } })
                .then(result => {

                    console.log(result[0]);

                    objLogin.password = undefined

                    if (result[0]) {

                        return res.status(200).send({
                            ok: true,
                            message: `successful updation id ${id}`,
                            result: objLogin,

                        });

                    } else {
                        return res.status(403).send({
                            ok: false,
                            message: `failed updation, not found id ${id}`,
                            result: objLogin

                        });
                    }


                }).catch(err => {

                    return res.status(500).send({
                        ok: false,
                        message: err
                    });

                })

        }

    },
    startLogin() {

        Login.findOne({ where: { type: 'master' } }).then(result => {

            if (!result) {
                Login.create({
                    name: process.env.MASTER_NAME || 'master',
                    email: process.env.MASTER_EMAIL || 'master@master.com.br',
                    password: bcrypt.hashSync(process.env.MASTER_PASSWORD || '12345678.A', salt),
                    type: 'master',
                    active: 'Y'

                })

            }

        })
    }

}
