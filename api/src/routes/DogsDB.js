const { Router } = require('express');
const { Dog, Temperament } = require('../db.js');

const router = Router();


router.get('/', async (req, res) => {
    let dogsDb = await Dog.findAll({
        include: Temperament
    });
    //se parsea el objeto
    dogsDb = JSON.stringify(dogsDb);
    dogsDb = JSON.parse(dogsDb);

    res.json(dogsDb)
})

module.exports = router;