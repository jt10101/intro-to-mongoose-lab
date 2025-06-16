const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const customerSchema = new Schema({
  name: String,
  age: Number,
});

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;
