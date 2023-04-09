const express = require("express");
const { getAllTask, addTask, getSingleTask, updateTask, deleteTask, pagination } = require("../controller/task")

const router = express.Router();

router.get('/', getAllTask)
router.post('/', addTask)
router.get('/:id', getSingleTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router;