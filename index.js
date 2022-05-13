const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to db
connectDB();

app.use(express.json({ extended: false}));

// Define routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5002;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
