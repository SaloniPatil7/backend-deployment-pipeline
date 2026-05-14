const Todo = require('../models/todoModel.js');
const asyncWrap = require('../utils/handleTryCatch.js');
const customError = require('../utils/customErrors.js');



//used wrapAsync and CustomErro Handling


//// only users TODO will be seen
// exports.getTodos = asyncWrap(async (req, res) => {
//     const todos = await Todo.find({createdBY: req.user._id});
//     res.status(200).json(todos);
// })


//Authorization
//// all user will be seen but update and delete option  only seen to the owner
exports.getTodos = asyncWrap(async (req, res) => {
    const todos = await Todo.find({});
    res.status(200).json(todos);
})


exports.getOneTodo = asyncWrap(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        throw new customError("Todo Not Found", 404);
    }
    res.status(200).json(todo);
})


exports.addTodo = asyncWrap(async (req, res) => {
    // ✅ validation BEFORE hitting DB
    console.log(`"addTodo"=${req.user}`);
    if (!req.body.task) {
        throw new customError("Title is required", 400);
    }
    console.log(`"addTodo"=${req.user}`);
    const data = new Todo({ ...req.body, createdBY: req.user._id });
    const todo = await data.save();
    res.status(201).json(todo);

})

exports.deleteTodo = asyncWrap(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        throw new customError("Todo Not Found", 404);
    }

    // 🔥 check owner
    if (todo.createdBY.toString() !== req.user._id.toString()) {
        throw new customError("Not authorized", 403);
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(todo);

})

exports.updateTodo = asyncWrap(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        throw new customError("Todo Not Found", 404);
    }

    // 🔥 check owner Authorization
    if (todo.createdBY.toString() !== req.user._id.toString()) {
        throw new customError("Not authorized", 403);
    }

    await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { returnDocument: 'after' }, { runValidators: true });

    res.status(200).json(todo);

})


