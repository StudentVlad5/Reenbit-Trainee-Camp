const { Schema, model } = require("mongoose");

const schema = new Schema({
  id: { type: String, require: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = model("Message", schema);
