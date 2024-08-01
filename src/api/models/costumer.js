const mongoose = require("mongoose");

const costumerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    ID: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    spa: { type: mongoose.Schema.Types.ObjectId, ref: 'Spa', required: true }, 
   fare: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Costumer = mongoose.model("costumers", costumerSchema, "costumers");
module.exports = Costumer;