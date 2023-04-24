import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

export default errorMiddleware;
