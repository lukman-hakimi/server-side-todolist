const {taskModel} = require("../models/task");
const { StatusCodes } = require("http-status-codes");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = StatusCodes;

const getAllTask = async (req, res) => {
   

    try {
        const data = await taskModel.find({});
        if(!data) return res.status(BAD_REQUEST).json({msg: "ooopss!!"});

        res.status(OK).json({ data });
        
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

const addTask = async (req, res) => {
    const { task, date, reminder } = req.body;
    try {
        if(task !== '' && date !== ''){
            const data = await taskModel.create({ task, date, reminder });
            if(!data) return res.status(BAD_REQUEST).json({msg: "oopss!!"})
    
            res.status(OK).json({data});
        }
        else{
            res.status(BAD_REQUEST).json({msg: "please enter empty field!!"})
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

const getSingleTask = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await taskModel.findById(id);
        if(!data) return res.status(BAD_REQUEST).json({msg: "oopss!!"})

        res.status(OK).json({data});
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await taskModel.findOneAndUpdate({_id: id}, req.body, {
            new:true, runValidators:true
        });
        if(!data) return res.status(BAD_REQUEST).json({msg: "oopss!! something went wrong please tyr again"})

        res.status(OK).json({data});
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await taskModel.findOneAndRemove({_id:id});
        if(!data) return res.status(BAD_REQUEST).json({msg: "oopss!! something went wrong please tyr again"})

        res.status(OK).json({data});
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

const pagination = async (req, res) => {
  
}

module.exports = {
    getAllTask,
    addTask,
    getSingleTask,
    updateTask,
    deleteTask,
    pagination
}