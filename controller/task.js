const {taskModel} = require("../models/task");
const { StatusCodes } = require("http-status-codes");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = StatusCodes;

const getAllTask = async (req, res) => {
    const { page = 1 ,limit = 4 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const countPromise = taskModel.estimatedDocumentCount({});
        const dataPromise = taskModel.find({}).limit(limit).skip(skip).sort("-createdAt");
        const [count, data] = await Promise.all([countPromise, dataPromise]);

        const pageCount = Math.ceil(count / limit);

        res.status(OK).json({ data, pageCount });
        
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({msg: error.message});
    }
}

const addTask = async (req, res) => {
    const { task, date, reminder } = req.body;
    try {
        const data = await taskModel.create({ task, date, reminder });
        if(!data) return res.status(BAD_REQUEST).json({msg: "oopss!!"})

        res.status(OK).json({data});
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