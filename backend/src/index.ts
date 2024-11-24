import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import authRoutes from "./routes/auth";
import { User } from "./types/datatypes";
import verifyToken from "./middlewares/verifyToken";
import cookieParser from "cookie-parser";
import allowedOrigins from "./config/allowedOrigins";
import { credentials } from "./middlewares/credentials";

dotenv.config({ path: ".env" });

const server = express();

// Middlewares
server.use(express.json());

server.use(credentials);

server.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed By CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);

server.use(cookieParser());

neonConfig.webSocketConstructor = ws;
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Routes
server.use("/auth", authRoutes);

// server.get("/testing", async (req: Request, res: Response) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users");
//     res.send(rows[0]);
//   } catch (error) {
//     res.send({ field: "Error", message: error });
//   }
// });

// server.post("/testing", verifyToken, async (req: Request, res: Response) => {
//   try {
//     res.sendStatus(200);
//   } catch (error) {
//     res.sendStatus(500).json(error);
//   }
// });

server.use(verifyToken);

const PORT = 4444;

server.listen(PORT, () => {
  console.log(
    `The Server for CodeGreen has Started at http://localhost:${PORT}`
  );
});
