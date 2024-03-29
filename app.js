const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // if you use dotenv for environment variables

// MongoDB connection string should be in an environment variable

const mongoURI = process.env.mongoURI;
console.log(process.env.mongoURI)

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected successfully to MongoDB');
});

// Express app setup
const app = express();
app.use(express.json()); // for parsing application/json

// Import routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

// Start the server
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
