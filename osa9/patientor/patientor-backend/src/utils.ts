import { Gender, newPatient } from "./types";

/* String validation. */
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

/* Date validation. */
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

/* SSN validation. */
const isSSN = (ssn: string): boolean => {
  const split = ssn.split("-");
  if (split[0].length === 6 && split[1].length === 4) {
    return true;
  }
  return false;
};

/* Gender validation. */
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(gender);
};

/* Parse name. */
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name.");
  }
  return name;
};

/* Parse date of birth. */
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date.");
  }
  return date;
};

/* Parse SSN. */
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error("Incorrect or missing ssn.");
  }
  return ssn;
};

/* Parse gender. */
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender.");
  }
  return gender;
};

/* Parse occupation. */
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation.");
  }
  return occupation;
};

/* Entry validation. */
const toNewEntry = (object: unknown): newPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing.");
};

export default toNewEntry;
