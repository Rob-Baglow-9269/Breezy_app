const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const weatherRoutes = require('./routes/weather');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
  res.send('Weather App API');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
