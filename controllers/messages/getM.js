const { ValidationError } = require("../../helpers");
const { Message } = require("../../models");

const getMessages = async (req, res, next) => {
  const { whom, from } = req.body;
  try {
    const renewStatus = await Message.updateMany({ whom: from, from: whom }, {status: "old"});
    const messages = await Message.find({
      $or: [
        //   {
        { whom: whom, from: from },
        { whom: from, from: whom },
      ],
    }).sort({ data: 1 });
    res.status(200).json(messages);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getMessages;
