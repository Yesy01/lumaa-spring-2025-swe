import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config();
console.log(process.env.DATABASE_URL)

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Root endpoint to verify the server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Use authentication and task routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
