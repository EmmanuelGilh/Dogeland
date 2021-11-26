const { Router } = require('express');
const dogs = require('./allDogs.js');
const DogsDB = require('./DogsDB.js');
const DetailDogs = require('./DetailsDogs')
const dogCreator = require('./dogCreator.js');
const Temperament = require('./Temperaments.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs)
router.use('/dogsDb', DogsDB)
router.use('/dogs/:id', DetailDogs)
router.use('/creator', dogCreator)
router.use('/temperament', Temperament)

module.exports = router;
