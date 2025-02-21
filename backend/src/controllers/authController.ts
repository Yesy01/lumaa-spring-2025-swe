import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

export const register: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    void res.status(201).json(result.rows[0]);
    return;
  } catch (err) {
    console.error(err);
    void res.status(500).json({ error: 'Error registering user' });
    return;
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) {
      void res.status(400).json({ error: 'User not found' });
      return;
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      void res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    void res.json({ token });
    return;
  } catch (err) {
    console.error(err);
    void res.status(500).json({ error: 'Error logging in' });
    return;
  }
};
