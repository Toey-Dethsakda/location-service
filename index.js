const express = require('express')
require('dotenv').config()
var cors = require('cors')
var app = express()

app.use(cors())

const Location = require('./models/location')

app.use(express.json())

const connectDB = require('./connectMongo')

connectDB()

const PORT = process.env.PORT

var corsOptions = {
    origin: ['http://localhost:3000', 'https://locat-storie.vercel.app'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/locations', cors(corsOptions), (req, res, next) => {
    Location.find()
        .then((locations) => {
            res.json(locations);
        })
        .catch((err) => {
            next(err);
        });
});

app.post('/api/locations', cors(corsOptions), async (req, res, next) => {

    
});

app.post('/api/locations', cors(corsOptions), function (req, res, next) {
    try {
        const { latitude, longitude } = req.body;

        // Create a new location document
        const location = new Location({
            latitude,
            longitude,
        });

        // Save the location to the database
        location.save();

        res.status(201).json({ message: 'Location point inserted successfully', location });
    } catch (error) {
        console.error('Error inserting location point: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.get('/api/locations', cors(corsOptions), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for an allowed domain.' })
// })

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})