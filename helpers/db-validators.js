const Task = require("../models/task");

const taskExistsById = async (id) => {
    const existTask = await Task.findByPk(id);
    if (!existTask) {
        throw new Error(`No existe una tarea con el id ${id}`);
    }

}

module.exports = {
    taskExistsById
}