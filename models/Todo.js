const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  todo: {
    type: String,
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
