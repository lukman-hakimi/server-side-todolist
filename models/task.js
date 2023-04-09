const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    task:{
        type: String,
        reqiured: true,
    },
    date:{
        type: String,
        reqiured: true,
    },
    reminder:{
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

const taskModel = mongoose.model("task", taskSchema);

module.exports = {
    taskModel
}