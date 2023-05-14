import express from "express";
import patientsService from "../services/patientsService";
import toNewEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
