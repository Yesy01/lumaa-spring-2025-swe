import { Request, Response, NextFunction, RequestHandler } from 'express';
import { pool } from '../db';

export const getTasks: RequestHandler = async (req, res, next) => {
  const userId = (req as any).userId;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
    void res.json(result.rows);
    return;
  } catch (err) {
    console.error(err);
    void res.status(500).json({ error: 'Error fetching tasks' });
    return;
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  const { title, description } = req.body;
  const userId = (req as any).userId;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, "isComplete", "userId") VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description || '', false, userId]
    );
    void res.status(201).json(result.rows[0]);
    return;
  } catch (err) {
    console.error(err);
    void res.status(500).json({ error: 'Error creating task' });
    return;
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  const taskId = req.params.id;
  const { title, description, isComplete } = req.body;
  const userId = (req as any).userId;
  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, "isComplete" = $3 
       WHERE id = $4 AND "userId" = $5 
       RETURNING *`,
      [title, description || '', isComplete, taskId, userId]
    );
    if (result.rowCount === 0) {
      void res.status(404).json({ error: 'Task not found or unauthorized' });
      return;
    }
    void res.json(result.rows[0]);
    return;
  } catch (err) {
    console.error(err);
    void res.status(500).json({ error: 'Error updating task' });
    return;
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  const taskId = req.params.id;
  const userId = (req as any).userId;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND "userId" = $2 RETURNING *',
      [taskId, userId]
    );
    if (result.rowCount === 0) {
      void res.status(404).json({ error: 'Task not found or unauthorized' });
      return;
    }
    void res.json({ message: 'Task deleted successfully' });
    return;
  } catch (err) {
    console.error(err);
    void res.status(500).json({ error: 'Error deleting task' });
    return;
  }
};
