"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/* Create app. */
const app = (0, express_1.default)();
/* Middleware. */
app.use(express_1.default.json());
/* Constants. */
const PORT = 3000;
/* Requests. */
app.get("/api/ping", (_req, res) => {
  console.log("ping");
  res.send("Hello World!");
});
/* Listen. */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
