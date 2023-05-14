import patientsData from "../../data/patients";
import { Patient, NonSensitivePatient, newPatient } from "../types";
import { v1 as uuid } from "uuid";

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
  }));
};

const addEntry = (patient: newPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newEntry = {
    id,
    ...patient,
  };
  patientsData.push(newEntry);
  return newEntry;
};

export default { getEntries, getNonSensitiveEntries, addEntry };
