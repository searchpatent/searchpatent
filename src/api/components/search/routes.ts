import express, { NextFunction, Request, Response } from "express";
import {
  addDocument,
  initIndex,
  initMapping,
  ping,
  search,
  bulkInsert,
} from "./controller";
const router = express.Router();

router.post(
  "/ping",
  async (req: Request, res: Response, next: NextFunction) => {
    const nonce = await ping();
    return res.status(200).json({
      nonce,
    });
  }
);

router.post(
  "/initIndex",
  async (req: Request, res: Response, next: NextFunction) => {
    const nonce = await initIndex(req.body.index);
    return res.status(200).json({
      nonce,
    });
  }
);
router.post(
  "/initMapping",
  async (req: Request, res: Response, next: NextFunction) => {
    const nonce = await initMapping(req.body.index, req.body.struct);
    return res.status(200).json({
      nonce,
    });
  }
);

router.post(
  "/add-document",
  async (req: Request, res: Response, next: NextFunction) => {
    const nonce = await addDocument(req.body.index, req.body.struct);
    return res.status(200).json({
      nonce,
    });
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({
      error: "Bad Request",
    });
  }
  const nonce = await search(req.body.index, query);
  return res.status(200).json({
    results: nonce.hits.hits,
  });
});

router.post(
  "/test-bulk",
  async (req: Request, res: Response, next: NextFunction) => {
    const nonce = await bulkInsert();
    return res.status(200).json({
      nonce,
    });
  }
);
export default router;
