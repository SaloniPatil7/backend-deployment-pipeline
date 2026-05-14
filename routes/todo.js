const TodoControl= require('../controllers/todo.js');
const auth= require('../middlewares/auth.js');

const express= require('express');
const router= express.Router();

router.get('/',auth,TodoControl.getTodos);
router.get('/:id',TodoControl.getOneTodo);
router.post('/',auth,TodoControl.addTodo);
router.put('/:id',auth ,TodoControl.updateTodo);
router.delete('/:id',auth,TodoControl.deleteTodo);


// router.get('/try', TodoControl.gettry);

module.exports= router;
