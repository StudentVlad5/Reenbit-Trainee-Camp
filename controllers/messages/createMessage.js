const { ValidationError } = require("../../helpers");
const { Message } = require("../../models");

const createMessage = async (req, res, next) => {
  const { text, from, whom, data, autoanswer = false } = req.body;
  console.log("autoanswer", autoanswer);
  if (autoanswer) {
    try {
      const response = await fetch("https://api.quotable.io/random");
      console.log("response", response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const data = {text:json?.content, from, whom, data: Date.now()};
      await Message.create(data);
    } catch (error) {
      console.error(error.message);
    }
  }
  try {
    const createMessage = await Message.create({ text, from, whom, data });
    res.status(200).json(createMessage);
  } catch (err) {
    throw new ValidationError("Bad request (invalid request body)");
  }
};
module.exports = createMessage;
