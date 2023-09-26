import Employee from '../models/employeeModel.js'
import City from '../models/city.js'
import Country from '../models/country.js'
import State from '../models/state.js'
import Company from '../models/company.js'
import checkParameter from '../lib/checkParameter.js'


export default {
    async get(req, res) {

        await Employee.findAll({
            include: [
                {
                    model: City,
                    attributes: ['name'],
                    include: [
                        {
                            model: State,
                            attributes: ['name'],
                            include: [
                                {
                                    model: Country,
                                    attributes: ['name'],

                                }

                            ]
                        },
                    ],
                },
                {

                    model: Company,
                    attributes: ['name'],
                }

            ],

        })
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


        Employee.destroy({
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
        const { name, birth_date, photo_face, email, telephone_1, telephone_2, address, sex, active, id_city, id_company } = req.body;

        //valida se tem todos os parametros para salvar 
        if (!name || !birth_date || !email || !telephone_1 || !address || !sex || !active || !id_city || !id_company) {
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



        Employee.create({
            name:name.toUpperCase(),
            birth_date,
            photo_face,
            email:email.toUpperCase(),
            telephone_1,
            telephone_2,
            address: address.toUpperCase(),
            sex,
            active,
            id_city,
            id_company

        }).then(result => {
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
        const {
            name,
            birth_date,
            photo_face,
            email,
            telephone_1,
            telephone_2,
            address,
            sex,
            active,
            id_city,
            id_company } = req.body;

        //valida se existe parametro e se é número
        if (!id || isNaN(id)) {
            return res.status(403).send({
                ok: false,
                message: `missing parameter or ${id} not number`
            });
        }


        Employee.update({
            name: name ? name.toUpperCase() : undefined,
            birth_date: birth_date ? birth_date : undefined,
            photo_face: photo_face ? photo_face : undefined,
            email: email ? email.toUpperCase() : undefined,
            telephone_1: telephone_1 ? telephone_1 : undefined,
            telephone_2: telephone_2 ? telephone_2 : undefined,
            address: address ? address.toUpperCase() : undefined,
            sex: sex ? sex : undefined,
            active: active ? active : undefined,
            id_city: id_city ? id_city : undefined,
            id_company: id_company ? id_company : undefined,


        }, { where: { id } })
            .then(result => {

                if (result[0]) {
                    return res.status(200).send({
                        ok: true,
                        message: `successful updation id ${id}`,
                    });

                } else {
                    return res.status(403).send({
                        ok: false,
                        message: `failed updation, not found id ${id}`,


                    });

                }


            }).catch(err => {

                return res.status(500).send({
                    ok: false,
                    message: err
                });

            })



    },
}