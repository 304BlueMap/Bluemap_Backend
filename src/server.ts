import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { adminRoutes } from './routes/adminRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes
app.get('/api', (req, res) => {
    res.send('BlueMap Guardians API is running!');
});

app.use('/api/admin', adminRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
