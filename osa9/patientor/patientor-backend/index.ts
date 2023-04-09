import express from "express";

/* Create app. */
const app = express();

/* Middleware. */
app.use(express.json());

/* Constants. */
const PORT = 3001;

/* Requests. */
app.get("/api/ping", (_req, res) => {
  console.log("ping");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send("Hello World!");
});

/* Listen. */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
