const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors');

const Location = require('./models/location')

app.use(express.json())

app.use(cors({
    origin: 'https://locat-storie.vercel.app/', // Allow all origins (you can restrict it to specific domains if needed)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allow the specified HTTP methods
    allowedHeaders: 'Content-Type', // Allow the specified headers
  }));

const connectDB = require('./connectMongo')

connectDB()

const PORT = process.env.PORT

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '(*)'); // Replace with your actual frontend origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


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

app.post('/api/locations', async (req, res, next) => {

    try {
        const { latitude, longitude } = req.body;

        // Create a new location document
        const location = new Location({
            latitude,
            longitude,
        });

        // Save the location to the database
        next();
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