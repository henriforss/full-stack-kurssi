import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

/* Create app. */
const app = express();

/* Middleware. */
app.use(express.json());

/* Fix cors. */
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/* Constants. */
const PORT = 3001;

/* Requests. */
app.get("/api/ping", (_req, res) => {
  console.log("ping");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send("Hello World!");
});

app.use("/api/diagnoses", diagnosesRouter);

app.use("/api/patients", patientsRouter);

/* Listen. */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
