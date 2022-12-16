const { response, request } = require("express");

const Task = require("../models/task");

const taskGet = async (req = request, res = response) => {
  const tasks = await Task.findAll();

  res.status(200).json(tasks);
};

const taskPost = async (req, res = response) => {
  const { title, description, completed } = req.body; // Obtiene el body de la petición y lo desestructura

  const dateToday = new Date();
  const userLogged = 1;

  const task = await Task.create({
    title,
    description,
    completed,
    created_by: userLogged,
    updated_by: userLogged,
    created_at: dateToday,
    updated_at: dateToday,
  });

  res.status(201).json({
    msg: "Tarea creada",
    task,
  });
};

const taskPut = async (req, res = response) => {
  const { title, description, completed } = req.body;
  const { id } = req.params;

  const dateToday = new Date();
  const userLogged = 1;

  const task = await Task.update(
    {
      title,
      description,
      completed,
      updated_by: userLogged,
      updated_at: dateToday,
    },
    {
      where: {
        id
      },
    },
  );

  res.json({
    msg: "Tarea actualizada",
    task,
  });
};

module.exports = {
  taskGet,
  taskPost,
  taskPut,
};
