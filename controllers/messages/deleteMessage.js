const { ValidationError } = require("../../helpers");
const { Message } = require("../../models");

const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const message = await Message.deleteOne({ _id: id });
    if (message.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    return res.status(204).json({ message: "No Content" });
  } catch (e) {
    return res.status(400).json({ message: "`Bad request (id incorrect)" });
  }
};
module.exports = deleteMessage;
