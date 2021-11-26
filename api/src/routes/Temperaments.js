const { Router, response } = require('express');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Temperament } = require('../db.js');

const router = Router();

const fetchDogsUrl = 'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY

async function filterTemperaments(data){
    let temperaments = data.map(dog => dog.temperament + ',').toString().split(',').map(word => word.trim().replace(',', ''))
    let uniqueTemperaments = [];
        temperaments.forEach((temp) => {
            if (temp && !uniqueTemperaments.includes(temp) && temp !== null){
            uniqueTemperaments.push(temp)
            }
        })
        await uniqueTemperaments.forEach((value) => Temperament.create({name: value}))

}

router.get('/', async (req, res)=>{
    const temperaments = await Temperament.findAll({ attributes: ['name'] })

        if (!temperaments.length) { 
            const request = await axios.get(fetchDogsUrl)
            await filterTemperaments(request.data)
            const response = await Temperament.findAll({ attributes: ['name'] })
            res.json(response)
        } 
    else res.json(temperaments)
})

module.exports = router;