import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import participantsRouter from './routes/participants.js'; // <-- Importa tus rutas

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 👇 Aquí es donde se crea el prefijo /api
app.use('/api', participantsRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});