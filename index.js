require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./data/connection");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
//routes
const taskRouter = require("./routes/task");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(xss());
app.use(express.json());

//routes
app.use("/api/tasks", taskRouter);
app.use("/", (req, res) => {
    res.status(200).send("Welcome")
})

const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, console.log(`app is listinig on ${port}`));
    } catch (error) {
        console.log(error.message);
    }
}
start();