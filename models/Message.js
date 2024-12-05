const { number, required } = require("joi");
const { Schema, model } = require("mongoose");

const schema = new Schema({
  text: { type: String, required: true },
  from: { type: String, required: true },
  whom: { type: String, required: true },
  data: { type: Number, required: true },
  status: { type: String, default: "new" },
  autoanswer: {type: Boolean, default: false}
});

module.exports = model("Message", schema);
