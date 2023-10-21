const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  userAgent: String,
  update_at : { type: Date, default: Date.now}
});


module.exports = mongoose.model('Location', locationSchema)