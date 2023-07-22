import { Application, Express } from "express";
import ipRoutes from "./api/components/intellectual-property/routes";
import auth from "./api/components/auth/routes";
export function routes(app: Application): void {
  app.use("/intellectual-property", ipRoutes);
  app.use("/auth", auth);
}
