const mongoose = require("mongoose");

const topPredictionSchema = new mongoose.Schema(
  {
    disease: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    prediction: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    // ==========================================
    // TOP 3 AI PREDICTIONS
    // ==========================================

    topPredictions: {
      type: [topPredictionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Prediction",
  predictionSchema
);