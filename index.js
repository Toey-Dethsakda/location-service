const express = require('express')
const app = express()
require('dotenv').config()

const Location = require('./models/location')

app.use(express.json())

const connectDB = require('./connectMongo')

connectDB()

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/locations', (req, res, next) => {
    Location.find()
        .then((locations) => {
            res.json(locations);
        })
        .catch((err) => {
            next(err);
        });
});

app.post('/api/locations', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        // Create a new location document
        const location = new Location({
            latitude,
            longitude,
        });

        // Save the location to the database
        await location.save();

        res.status(201).json({ message: 'Location point inserted successfully', location });
    } catch (error) {
        console.error('Error inserting location point: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})