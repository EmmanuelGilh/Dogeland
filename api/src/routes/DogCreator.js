const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require('../db.js');

const router = Router();

router.post('/', async (req, res)=>{
    const { name, minHeight, maxHeight, minWeight, maxWeight, life_span, image, temperament } = req.body

    let temperamentDt = temperament.map(temp => {
        return Temperament.findOrCreate({
            where: {
                name: temp
            }
        })
    });

    let allTemps = await Promise.all(temperamentDt);
    let dog = await Dog.create({
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        life_span,
        image,
        temperament
    })

    allTemps.forEach(temp => dog.setTemperaments(temp[0]));

    res.send('New Dog Created!')
})


module.exports = router;