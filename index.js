const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const Menu = require('./schema'); // Import the Menu model correctly

const app = express();
const port = 3010;

// Use express to parse incoming JSON data
app.use(express.json());

// Serve static files
app.use(express.static('static'));

// Serve the index.html page on the root route
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
require('dotenv').config();
// Connect to MongoDB using Mongoose
mongoose.connect(process.env.db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// POST /menu: Add a new menu item to the database
app.post('/menu', async (req, res) => {
  const { name, description, price } = req.body;

  // Validate data (e.g., name and price are required)
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    // Create a new menu item
    const newMenu = new Menu({
      name,
      description,
      price
    });

    // Save the item to the database
    await newMenu.save();

    // Respond with success and the created item
    res.status(201).json({
      message: 'Menu item added successfully',
      item: newMenu // Fixed variable name here
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// GET /menu: Fetch all menu items
app.get('/menu', async (req, res) => {
  try {
    // Retrieve all menu items from the database
    const items = await Menu.find(); // Corrected variable name
    res.status(200).json(items); // Send back the list of menu items
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
