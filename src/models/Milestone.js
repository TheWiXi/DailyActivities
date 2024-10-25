const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    objetivo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripcion: String,
    fecha_objetivo: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "completado"],
      default: "pendiente",
    },
    orden: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Milestone", milestoneSchema);
