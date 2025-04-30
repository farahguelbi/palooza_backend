
const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Full Pizza', 'Slice'],
    required: true,
    default:'Full Pizza'
  },
});

module.exports = mongoose.model('Type', typeSchema);
