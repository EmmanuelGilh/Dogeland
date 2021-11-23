const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Dog } = require('../db.js');

const router = Router();



router.get('/', async (req, res) => {
    try {
        const request = await axios.get(`https://api.thedogapi.com/v1/breeds?access_key=${API_KEY}`)
    
            let arr = [] 
            arr.push(request.data.map( d => (
                {
                    id : d.id,
                    name: d.name,
                    image: d.image.url,
                    temperament: d.temperament,
                    weight: d.weight.metric,
                    height: d.height.metric,
                    life_span: d.life_span,
                }
            )))
        res.json(arr[0])
    } catch (error) {
        console.log(error)
    }
    })



module.exports = router;