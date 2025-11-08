import pool from '../db.js'; // <-- Importa la conexión a la BD

export const getParticipants = async (req, res) => {
  try {
    const { q } = req.query;
    if (q) {
      const query = q.toLowerCase();
      const [results] = await pool.query(
        'SELECT * FROM participants WHERE LOWER(nombre) = ? OR LOWER(apellidos) = ?',
        [query, query]
      );
      return res.json(results);
    }
    const [results] = await pool.query('SELECT * FROM participants');
    res.json(results); // <-- Envía los resultados como JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los participantes' });
  }
};

export const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM participants WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Participante no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el participante' });
  }
};

export const createParticipant = async (req, res) => {
  try {
    const { nombre, apellidos, email, twitter, ocupacion, avatar } = req.body;
    const [result] = await pool.query(
      'INSERT INTO participants (nombre, apellidos, email, twitter, ocupacion, avatar) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellidos, email, twitter, ocupacion, avatar]
    );
    const newParticipant = {
      id: result.insertId,
      ...req.body,
    };
    res.status(201).json(newParticipant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar participante' });
  }
};

export const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, email, twitter, ocupacion, avatar } = req.body;
    const [result] = await pool.query(
      'UPDATE participants SET nombre = ?, apellidos = ?, email = ?, twitter = ?, ocupacion = ?, avatar = ? WHERE id = ?',
      [nombre, apellidos, email, twitter, ocupacion, avatar, id]
    );
    if (result.affectedRows > 0) {
      res.json({ id, ...req.body });
    } else {
      res.status(404).json({ message: 'Participante no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar participante' });
  }
};

export const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM participants WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Participante eliminado' });
    } else {
      res.status(404).json({ message: 'Participante no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar participante' });
  }
};