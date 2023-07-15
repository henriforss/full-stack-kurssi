import express from "express";
import patientsService from "../services/patientsService";
import toNewEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

// Get single patient info
router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientsService.getEntryById(id);
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    // Validate request body
    const newEntry = toNewEntry(req.body);
    // Add entry in patientsService
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
