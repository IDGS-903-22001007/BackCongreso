import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let participants = [
  {
    id: 1,
    nombre: 'Juan',
    apellidos: 'Perez',
    email: 'juan.perez@example.com',
    twitter: 'juanperez',
    ocupacion: 'Desarrollador Frontend',
    avatar: 'https://i.pravatar.cc/150?u=1',
    creadoEn: new Date(),
  },
  {
    id: 2,
    nombre: 'Maria',
    apellidos: 'Gomez',
    email: 'maria.gomez@example.com',
    twitter: 'mariagomez',
    ocupacion: 'Diseñadora UX/UI',
    avatar: 'https://i.pravatar.cc/150?u=2',
    creadoEn: new Date(),
  },
];

let nextId = participants.length > 0 ? Math.max(...participants.map(p => p.id)) + 1 : 1;

app.get('/api/listado', (req, res) => {
  const { q } = req.query;
  if (q) {
    const query = q.toLowerCase();
    const results = participants.filter(p =>
      p.nombre.toLowerCase().includes(query) ||
      p.apellidos.toLowerCase().includes(query)
    );
    return res.json(results);
  }
  res.json(participants);
});

app.get('/api/participante/:id', (req, res) => {
  const { id } = req.params;
  const participant = participants.find(p => p.id === parseInt(id));
  if (participant) {
    res.json(participant);
  } else {
    res.status(404).json({ message: 'Participante no encontrado' });
  }
});

app.post('/api/registro', (req, res) => {
  const newParticipant = {
    id: nextId++,
    ...req.body,
    creadoEn: new Date(),
  };
  participants.push(newParticipant);
  res.status(201).json(newParticipant);
});

app.put('/api/participante/:id', (req, res) => {
  const { id } = req.params;
  const index = participants.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const updatedParticipant = { ...participants[index], ...req.body };
    participants[index] = updatedParticipant;
    res.json(updatedParticipant);
  } else {
    res.status(404).json({ message: 'Participante no encontrado' });
  }
});

app.delete('/api/participante/:id', (req, res) => {
  const { id } = req.params;
  const index = participants.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const [deletedParticipant] = participants.splice(index, 1);
    res.json(deletedParticipant);
  } else {
    res.status(404).json({ message: 'Participante no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
