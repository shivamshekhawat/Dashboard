const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('Could not connect to MongoDB:', err));

const dataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('Data', dataSchema);

app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (err) {
    console.error(err); 
    res.status(500).send('Server Error'); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
