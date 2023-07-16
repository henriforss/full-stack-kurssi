import { Gender, newEntry, newPatient } from "./types";

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

/* Parse specialist. */
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist.");
  }
  return specialist;
};

/* Parse description. */
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description.");
  }
  return description;
};

/* Parse employer name. */
const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name.");
  }
  return name;
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

/* Parse health rating. */
const parseHealthRating = (rating: unknown): number => {
  if (!rating || typeof rating !== "number" || rating < 0 || rating > 3) {
    throw new Error("Incorrect or missing health rating.");
  }
  return rating;
};

/* Parse discharge. */
const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge) ||
    !isString(discharge.date) ||
    !isString(discharge.criteria) ||
    !isDate(discharge.date)
  ) {
    throw new Error("Incorrect or missing discharge.");
  }
  return { date: discharge.date, criteria: discharge.criteria };
};

// DIAGNOSIS CODES ARE OPTIONAL IN THE CODE
// /* Parse diagnose codes. */
// const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
//   if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
//     // we will just trust the data to be in correct form
//     return [] as Array<Diagnose["code"]>;
//   }

//   return object.diagnosisCodes as Array<Diagnose["code"]>;
// };

/* Entry validation. */
export const toNewEntry = (object: unknown): newPatient => {
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
      entries: [],
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing.");
};

/* Diagnose entry validation. */
export const toNewDiagnoseEntry = (object: unknown): newEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing entry.");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newDiagnoseEntry = {
            ...object,
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            healthCheckRating: parseHealthRating(object.healthCheckRating),
          };
          return newDiagnoseEntry;
        }
        throw new Error("Incorrect data: some fields are missing.");

      case "OccupationalHealthcare":
        if ("employerName" in object) {
          const newDiagnoseEntry = {
            ...object,
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            employerName: parseEmployerName(object.employerName),
          };
          return newDiagnoseEntry;
        }
        throw new Error("Incorrect data: some fields are missing.");

      case "Hospital":
        if ("discharge" in object) {
          const newDiagnoseEntry = {
            ...object,
            type: object.type,
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            discharge: parseDischarge(object.discharge),
          };
          return newDiagnoseEntry;
        }
        throw new Error("Incorrect data: some fields are missing.");
    }
  }

  throw new Error("Incorrect data: some fields are missing.");
};
