import patientsData from "../../data/patients-full";
import { Patient, NonSensitivePatient, newPatient, newEntry } from "../types";
import { v1 as uuid } from "uuid";

// console.log(patientsData);

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));
};

const addEntry = (patient: newPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newEntry = {
    id,
    ...patient,
  };
  // Push new entry into patients data array, note: the new data disappears when application is restarted
  patientsData.push(newEntry);
  return newEntry;
};

const getEntryById = (id: string): Patient => {
  const patient = patientsData.find((patient) => patient.id === id);

  if (patient) {
    return patient;
  } else {
    throw new Error("Patient id does not match any patient");
  }
};

// Add new diagnose entry to patient
const addDiagnoseEntry = (entry: newEntry, id: string) => {
  const entryId: string = uuid();

  const newEntry = {
    id: entryId,
    ...entry,
  };

  const patient = patientsData.find((patient) => patient.id === id);

  if (patient) {
    patient.entries.push(newEntry);
    return newEntry;
  } else {
    throw new Error("Patient id does not match any patient.");
  }
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getEntryById,
  addDiagnoseEntry,
};
