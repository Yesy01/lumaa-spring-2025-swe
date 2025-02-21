import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    void res.status(401).json({ error: 'No token provided' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      void res.status(403).json({ error: 'Failed to authenticate token' });
      return;
    }
    (req as any).userId = (decoded as any).id;
    next();
  });
};
