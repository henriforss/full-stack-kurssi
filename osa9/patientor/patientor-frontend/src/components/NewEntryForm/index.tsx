import React, { useState } from "react";
import axios from "axios";
import { Patient, newEntry, Entry } from "../../types";

interface Props {
  id: string | undefined;
  option: string;
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewEntryForm = ({
  id,
  option,
  patient,
  setPatient,
  setError,
  setModalOpen,
}: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("0");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const postDiagnoseEntry = async () => {
      const diagnosisArray = diagnosisCodes.split(" ");

      let entry;

      switch (option) {
        case "HealthCheck":
          entry = {
            type: option,
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisArray,
            healthCheckRating: parseInt(healthCheckRating),
          };
          break;
        case "OccupationalHealthcare":
          entry = {
            type: option,
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisArray,
            employerName,
            sickLeave: {
              startDate,
              endDate,
            },
          };
          break;
        case "Hospital":
          entry = {
            type: option,
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisArray,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
      }
      console.log(entry);

      const addedEntry = await axios.post<newEntry>(
        `http://localhost:3001/api/patients/${id}/entries`,
        entry
      );

      const updatedPatient = {
        ...patient,
        entries: patient?.entries.concat(addedEntry.data as Entry),
      };
      setPatient(updatedPatient as Patient);
    };

    try {
      await postDiagnoseEntry();

      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating("");
      setDiagnosisCodes("");
      setEmployerName("");
      setStartDate("");
      setEndDate("");
      setDischargeDate("");
      setDischargeCriteria("");
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMessage = " Error: " + error.response?.data;
      }
      setError(errorMessage);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const resetForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes("");
    setEmployerName("");
    setStartDate("");
    setEndDate("");
    setDischargeDate("");
    setDischargeCriteria("");
    setModalOpen(false);
  };

  console.log(healthCheckRating);

  switch (option) {
    case "HealthCheck":
      return (
        <div>
          <h4>New health check entry</h4>
          <form onSubmit={submitForm} onReset={resetForm}>
            <p>
              Description:
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              Date:
              <input
                type="date"
                min={"2000-01-01"}
                max={"2050-12-31"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              Specialist:
              <input
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              />
              <br />
              Diagnosis codes:
              <input
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value)}
              />
              <br />
              Healthcheck rating:
              <select onChange={(e) => setHealthCheckRating(e.target.value)}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </p>
            <br />
            <button type="reset">Cancel</button>
            <button type="submit">Add</button>
          </form>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <h4>New occupational healthcare entry</h4>
          <form onSubmit={submitForm} onReset={resetForm}>
            <p>
              Description:
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              Date:
              <input
                type="date"
                min={"2000-01-01"}
                max={"2050-12-31"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              Specialist:
              <input
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              />
              <br />
              Diagnosis codes:
              <input
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value)}
              />
              <br />
              Employer name:
              <input
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
              <br />
              Sick leave:
              <input
                type="date"
                min={"2000-01-01"}
                max={"2050-12-31"}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />{" "}
              &ndash;{" "}
              <input
                type="date"
                min={"2000-01-01"}
                max={"2050-12-31"}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </p>
            <br />
            <button type="reset">Cancel</button>
            <button type="submit">Add</button>
          </form>
        </div>
      );

    case "Hospital":
      return (
        <div>
          <h4>New hospital entry</h4>
          <form onSubmit={submitForm} onReset={resetForm}>
            <p>
              Description:
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              Date:
              <input
                type="date"
                min={"2000-01-01"}
                max={"2050-12-31"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              Specialist:
              <input
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              />
              <br />
              Diagnosis codes:
              <input
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value)}
              />
              <br />
              Discharge date:
              <input
                type="date"
                min={"2000-01-01"}
                max={"2050-12-31"}
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
              <br />
              Discharge criteria:
              <input
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              />
            </p>
            <br />
            <button type="reset">Cancel</button>
            <button type="submit">Add</button>
          </form>
        </div>
      );
    default:
      return <div>Hmm... something went wrong...</div>;
  }
};

export default NewEntryForm;
