import { Diagnose, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnose[];
}

interface Props {
  entry: Entry;
  diagnoses: Diagnose[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientEntry = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div
          style={{
            backgroundColor: "lightgreen",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h4>Health check</h4>
          <p>
            {entry.date} <em>{entry.description}</em>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code, i) => {
              const codeDescription = diagnoses.find(
                (obj) => obj.code === code
              );
              return (
                <li key={i}>
                  {code} {codeDescription?.name}
                </li>
              );
            })}
          </ul>
          <p>Health rating: {entry.healthCheckRating}</p>
          <p>Diagnose by {entry.specialist}</p>
        </div>
      );
    case "Hospital":
      return (
        <div
          style={{
            backgroundColor: "pink",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h4>Hospital </h4>
          <p>
            {entry.date} <em>{entry.description}</em>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code, i) => {
              const codeDescription = diagnoses.find(
                (obj) => obj.code === code
              );
              return (
                <li key={i}>
                  {code} {codeDescription?.name}
                </li>
              );
            })}
          </ul>
          <p>
            Discharge: {entry.discharge.date}{" "}
            <em>{entry.discharge.criteria}</em>
          </p>
          <p>Diagnose by {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div
          style={{
            backgroundColor: "yellow",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h4>Occupational healthcare ({entry.employerName})</h4>
          <p>
            {entry.date} <em>{entry.description}</em>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code, i) => {
              const codeDescription = diagnoses.find(
                (obj) => obj.code === code
              );
              return (
                <li key={i}>
                  {code} {codeDescription?.name}
                </li>
              );
            })}
          </ul>
          <p>
            Sick leave: {entry.sickLeave?.startDate} &ndash;{" "}
            {entry.sickLeave?.endDate}
          </p>
          <p>Diagnose by {entry.specialist}</p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;
