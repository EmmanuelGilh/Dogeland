const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Dog } = require('../db.js');

const router = Router( {mergeParams: true} );

router.get('/', async (req, res) => {
    const { id } = req.params
    if (id){
        try {
            const request = await axios.get(`https://api.thedogapi.com/v1/breeds?access_key=${API_KEY}`)
            let dog = request.data.filter( d => d.id == id).map( d => (
                    {
                        id : d.id,
                        name: d.name,
                        image: d.image.url,
                        temperament: d.temperament,
                        weight: d.weight.metric,
                        height: d.height.metric,
                        life_span: d.life_span,
                    }
                ))
                return res.json(dog)
        } catch (error) {
            console.log('error en el Query', error)
        }
    }
    else {
        return res.send('No me llego mi ID.')
    }
})

module.exports = router;








//revisar la consola por errores