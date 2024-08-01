const mongoose = require("mongoose");

const spaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, default: 0 },
    email: { type: String, required: true },
   service: {
      type: String,
      enum: ["Masaje", "Pedicura", "Sillón de Masaje", "Terapia geotermal"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Spa = mongoose.model("Spa", spaSchema, "spas");
module.exports = Spa;