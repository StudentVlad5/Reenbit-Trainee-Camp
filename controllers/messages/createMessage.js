const { ValidationError } = require("../../helpers");
const { Message } = require("../../models");

const createMessage = async (req, res, next) => {
  const { text, from, whom, data, autoanswer = false } = req.body;
  console.log("autoanswer", autoanswer);
  if (autoanswer) {
      fetch("https://api.quotable.io/random", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
          "Access-Control-Expose-Headers": "Content-Range",
        },
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      const response = await fetch("https://api.quotable.io/random");
      console.log("response", response);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      // const json = await response.json();
      // const data = {text:json?.content, from, whom, data: Date.now()};
      // await Message.create(data);
  }
  try {
    const createMessage = await Message.create({ text, from, whom, data });
    res.status(200).json(createMessage);
  } catch (err) {
    throw new ValidationError("Bad request (invalid request body)");
  }
};
module.exports = createMessage;
