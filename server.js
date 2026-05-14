const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todo = require('./routes/todo.js');
const user = require('./routes/user.js');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();


app.use(cookieParser());   
app.use(cors({
    origin: true, 
    credentials: true             
}));
app.use(express.json());


async function main() {
   await mongoose.connect(process.env.MONGO_URI);
}

main()
    .then(() => console.log("DB COnnected"))
    .catch((Err) => console.log(Err))

app.listen(process.env.PORT, () => {
    console.log("server is started");
})
app.get('/root', (req, res) => {
    res.send("root is working");
})

app.use('/todo', todo);
app.use('/user', user);

app.use((err, req, res, next) => {
    console.log(" FULL ERROR:", err);   // ADD THIS
    console.log(" STACK:", err.stack);  // ADD THIS
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

