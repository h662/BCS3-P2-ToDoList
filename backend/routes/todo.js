const { PrismaClient } = require("@prisma/client");
const express = require("express");

const router = express.Router();

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { todo, userId } = req.body;

    const newTodo = await prisma.todo.create({
      data: {
        todo,
        isDone: false,
        userId: parseInt(userId),
      },
    });

    res.json({ ok: true, todo: newTodo });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
