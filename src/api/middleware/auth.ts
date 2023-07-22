import { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: "Unauthorized",
  });
}
