import Company from "../models/company.js";
import City from "../models/city.js";
import State from "../models/state.js";
import Country from "../models/country.js";


export default {
    async get(req, res) {
        await Company.findAll({
            attributes: ['id', 'name','cnpj','address'], // Atributos da tabela Company que deseja selecionar
            include: [
              {
                model: City,
                attributes: ['name'],
                include: [
                  {
                    model: State,
                    attributes: ['name'],
                    include: [{
                        model: Country,
                        attributes: ['name'],

                    }]
                  },
                ],
              },
            ], 
          }).then(result => {

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

        Company.destroy({
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
        const { name,cnpj, address,id_city } = req.body;

        //valida se tem todos os parametros para salvar 
        if (!name || !cnpj || !address || address.lenght < 10 || !id_city) {
            return res.status(403).send({
                ok: false,
                message: 'missing parameter'
            });
        }

        await Company.create({
            name: name.toUpperCase(),
            cnpj,
            address: address.toUpperCase(),
            id_city
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
        const { name,cnpj,address ,id_city} = req.body;

        //valida se existe parametro e se é número
        if (!id || isNaN(id) || address.lenght < 10) {
            return res.status(403).send({
                ok: false,
                message: `missing parameter or ${id} not number`
            });
        }


        Company.update({ 
            name: name ? name.toUpperCase() : undefined,
            cnpj: cnpj? cnpj : undefined,
            address: address? address.toUpperCase() : undefined,
            id_city: id_city? id_city : undefined,

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