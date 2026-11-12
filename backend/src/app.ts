import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import { AppError } from "./errors/AppError.js";
import { errorHandler } from "./errors/errorHandler.js";
import produtosRoutes from "./modules/Produtos/produtos.routes.js";
import usuariosRoutes from "./modules/usuarios/usuarios.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/produtos", produtosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/login", authRoutes);

// Rota inexistente (sempre antes do errorHandler)
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError("A rota solicitada não existe.", 404, "ROUTE_NOT_FOUND"));
});

app.use(errorHandler);

export default app;