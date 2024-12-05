const { ValidationError } = require("../../helpers");
const { Message } = require("../../models");

const editMessage = async (req, res, next) => {
  const { text, id } = req.body;
  console.log(text, id);
  try {
    const editMessage = await Message.findByIdAndUpdate({ _id: id }, { text: text });
    res.status(200).json(editMessage);
  } catch (err) {
    throw new ValidationError("Bad request (invalid request body)");
  }
};
module.exports = editMessage;
