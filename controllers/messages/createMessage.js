const { ValidationError } = require("../../helpers");
const { Message } = require("../../models");

const createMessage = async (req, res, next) => {
  const { text, from, whom, data } = req.body;
  try {
    const createMessage = await Message.create({ text, from, whom, data });
    res.status(200).json(createMessage);
  } catch (err) {
    throw new ValidationError("Bad request (invalid request body)");
  }
};
module.exports = createMessage;
