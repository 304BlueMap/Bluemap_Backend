import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { adminRoutes } from './routes/adminRoutes';
import { mapRoutes } from './routes/mapRoutes';
import { missionRoutes } from './routes/missionRoutes';
import { aiRoutes } from './routes/aiRoutes';

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
app.use('/api/map', mapRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/ai', aiRoutes);


// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
