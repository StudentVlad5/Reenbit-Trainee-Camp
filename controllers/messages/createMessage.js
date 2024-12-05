const { ValidationError } = require("../../helpers");
const { Message } = require("../../models");

const createMessage = async (req, res, next) => {
  const { text, from, whom, data, autoanswer = false } = req.body;
  try {
    const createMessage = await Message.create({ text, from, whom, data });
    if (autoanswer) {
      const res = await fetch("https://zenquotes.io/api/random/unlimited", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
          "Access-Control-Expose-Headers": "Content-Range",
        },
      });
      const json = await res.json();
      if (!Array.isArray(json)) {
        new Error(`Response status: ${response.status}`);
      }
      // const response = await fetch("https://api.quotable.io/random");
      const newM = await Message.create({ text: json[0].q, from, whom, data });
    }
    res.status(200).json(createMessage);
  } catch (err) {
    throw new ValidationError("Bad request (invalid request body)");
  }
};

module.exports = createMessage;
