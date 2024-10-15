import express from 'express';
import { Pool } from 'pg';
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: 'postgresql-184709-0.cloudclusters.net',
  port: 10031,
  user: 'yuyiii',
  password: 'yuyiii@1234',
  database: 'yuyiii',
});

// Google Cloud Storage setup
const storage = new Storage({
  projectId: 'FirstAPI',
});
const bucket = storage.bucket('test8789');

// Multer setup for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Create tables if they don't exist
const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        max_occupancy INTEGER NOT NULL,
        starting_tariff DECIMAL(10, 2) NOT NULL,
        lawn_area VARCHAR(255),
        conference_halls INTEGER,
        banquet_capacity INTEGER,
        alcohol_available BOOLEAN,
        status VARCHAR(50) DEFAULT 'pending'
      );

      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        property_id INTEGER REFERENCES properties(id),
        media_type VARCHAR(50) NOT NULL,
        url VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        property_id INTEGER REFERENCES properties(id),
        user_id INTEGER,
        event_date DATE NOT NULL,
        guests INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'pending'
      );

      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id),
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending'
      );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
  } finally {
    client.release();
  }
};

createTables();

// API Routes

// Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM properties');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching properties' });
  }
});

// Add a new property
app.post('/api/properties', async (req, res) => {
  const { name, location, max_occupancy, starting_tariff, lawn_area, conference_halls, banquet_capacity, alcohol_available } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO properties (name, location, max_occupancy, starting_tariff, lawn_area, conference_halls, banquet_capacity, alcohol_available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, location, max_occupancy, starting_tariff, lawn_area, conference_halls, banquet_capacity, alcohol_available]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error adding property' });
  }
});

// Upload media for a property
app.post('/api/properties/:id/media', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileName = `${Date.now()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).json({ error: 'Error uploading file' });
  });

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    try {
      await pool.query(
        'INSERT INTO media (property_id, media_type, url) VALUES ($1, $2, $3)',
        [id, file.mimetype.startsWith('image') ? 'image' : 'video', publicUrl]
      );
      res.status(201).json({ url: publicUrl });
    } catch (err) {
      res.status(500).json({ error: 'Error saving media information' });
    }
  });

  blobStream.end(file.buffer);
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Add a new booking
app.post('/api/bookings', async (req, res) => {
  const { property_id, user_id, event_date, guests } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO bookings (property_id, user_id, event_date, guests) VALUES ($1, $2, $3, $4) RETURNING *',
      [property_id, user_id, event_date, guests]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error adding booking' });
  }
});

// Update booking status
app.patch('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error updating booking status' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});