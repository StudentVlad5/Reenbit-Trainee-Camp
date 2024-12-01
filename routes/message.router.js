const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const Message = require("../models/Message");

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    return res.status(200).json(messages);
  } catch (e) {
    return res.status(500).json({ message: "`Bad request" });
  }
});

router.post("/create", async (req, res) => {
  const { body, id = uuidv4() } = req.body;

  try {
    const item = await Message.create({ id, text: body });
    if (item) {
      return res.status(201).json({ message: "Message was saved!" });
    }
  } catch (e) {
    return res.status(400).json({ message: "`Bad request" });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const message = await Message.deleteOne({ id });
    if (message.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    return res.status(204).json({ message: "No Content" });
  } catch (e) {
    return res.status(400).json({ message: "`Bad request (id incorrect)" });
  }
});

router.put("/update", async (req, res) => {
  const { id, body, completed } = req.body.data;
  try {
    const message = await Message.findOneAndUpdate(
      { id },
      { id, text: body, completed }
    );
    return res.status(200).json({ message: "Successful update" });
  } catch (e) {
    return res.status(400).json({ message: "`Bad request (id incorrect)" });
  }
});

module.exports = router;
