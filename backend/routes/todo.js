const { PrismaClient } = require("@prisma/client");
const express = require("express");

const router = express.Router();

const prisma = new PrismaClient();

// 투두 생성
router.post("/", async (req, res) => {
  try {
    const { todo, userId } = req.body;

    if (!todo) {
      return res.status(400).json({ ok: false, error: "Not exist todo." });
    }
    if (!userId) {
      return res.status(400).json({ ok: false, error: "Not exist userId." });
    }

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

// 투두 조회
router.get("/", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ ok: false, error: "Not exist userId." });
    }

    const todo = await prisma.todo.findMany({
      where: {
        userId,
      },
    });

    if (!todo) {
      return res.status(400).json({
        ok: false,
        error: "Not exist todo.",
      });
    }

    res.json({ ok: true, todo });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
