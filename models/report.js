const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    name: { type: String },
    fontsused: [String],
    fontsizes: [Number],
    characters: { type: Number },
    lines: { type: Number },
    sections: [String],
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("report", ReportSchema);
