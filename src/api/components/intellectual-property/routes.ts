import express, { NextFunction, Request, Response } from "express";
import {
  deleteIPById,
  getIPByHolder,
  getIPById,
  getIPs,
  updateIP,
} from "./controller";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const ips = await getIPs();
  return res.status(200).json({
    ips,
  });
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const ip = await getIPById(req.params.id);
  return res.status(200).json({
    ip,
  });
});

router.get(
  "/holder/:holder",
  async (req: Request, res: Response, next: NextFunction) => {
    const byHolderNonce = await getIPByHolder(req.params.holder);
    return res.status(200).json({
      byHolderNonce,
    });
  }
);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const ip = await updateIP(req.params.id, req.body);
  return res.status(200).json({
    ip,
  });
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const ip = await deleteIPById(req.params.id);
    return res.status(200).json({
      ip,
    });
  }
);

export default router;
