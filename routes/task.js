const {Router} = require('express');
const { check } = require('express-validator');

// importar controladores
const {taskGet,taskPost, taskPut} = require('../controllers/taskController');

// importar Helpers
const {taskExistsById} = require('../helpers/db-validators');

// importar middlewares
const {validarCampos} = require('../middlewares/validar-campos');


// use Router() to create a new router object
const router = Router();


//rutas

// GET all tasks
router.get("/", taskGet);

// POST a new task
router.post("/", [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('completed', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], taskPost);

// PUT a task
router.put("/:id",[
    check('id').custom(taskExistsById),
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('completed', 'El estado es obligatorio').not().isEmpty(),
    validarCampos
], taskPut);


module.exports = router;