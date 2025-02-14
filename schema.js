const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;  // Export the Menu model
