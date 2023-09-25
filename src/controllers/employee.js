import Employee from '../models/employeeModel.js'
import checkParameter from '../lib/checkParameter.js'


export default {
    async get(req, res) {

        await Employee.findAll()
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
    async post(req, res) {
        const { name, birth_date, photo_face, email, telephone_1, telephone_2, addres, locality, city, state, company, sex, active } = req.body;

        //valida se tem todos os parametros para salvar 
        if (!name || !birth_date || !email || !telephone_1 || !addres || !locality || !city || !state || !company || !sex || !active) {
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
            name,
            birth_date,
            photo_face,
            email,
            telephone_1,
            telephone_2,
            addres,
            locality,
            city,
            state,
            company,
            sex,
            active

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
}