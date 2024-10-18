import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/user.model.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://my-app-client-apul.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));


app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.post('/api/form', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const user = await User.create({ username, password });

        res.status(201).json(user);
    } catch (error) {
        console.error('Error saving form data:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
