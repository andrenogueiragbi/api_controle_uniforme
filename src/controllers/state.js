import State from "../models/state.js";
import Country from "../models/country.js";


export default {
    async get(req, res) {
        await State.findAll({
            include: [{
                model: Country,
                attributes: [ 'name'],

            }]
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
/*     async delete(req, res) {

        const { id } = req.params

        //valida se existe parametro e se é número
        if (!id || isNaN(id)) {
            return res.status(403).send({
                ok: false,
                message: `missing parameter or ${id} not number`
            });
        }



        State.destroy({
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


    }, */
    async post(req, res) {
        const { name, abbreviation, id_country } = req.body;

        //valida se tem todos os parametros para salvar 
        if (!name || !abbreviation || !id_country) {
            return res.status(403).send({
                ok: false,
                message: 'missing parameter'
            });
        }


        await State.create({
            name: name.toUpperCase(),
            abbreviation: abbreviation.toUpperCase(),
            id_country
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
/*     async update(req, res) {

        const { id } = req.params
        const { name } = req.body;

        //valida se existe parametro e se é número
        if (!id || isNaN(id)) {
            return res.status(403).send({
                ok: false,
                message: `missing parameter or ${id} not number`
            });
        }


        State.update({ name: name.toUpperCase() }, { where: { id } })
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



    }, */
}