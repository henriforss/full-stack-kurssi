import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnose, Patient } from "../../types";
import NewEntryForm from "../NewEntryForm";
import PatientEntry from "../PatientEntry";

interface Props {
  diagnoses: Diagnose[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [option, setOption] = useState<string>("HealthCheck");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  // console.log(id);
  // console.log(patient);
  // console.log(option);
  // console.log(modalOpen);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>
        gender: {patient?.gender}
        <br />
        ssn: {patient?.ssn}
        <br />
        occupation: {patient?.occupation}
      </p>
      <h3>Add entry</h3>

      {error && (
        <p style={{ backgroundColor: "pink", padding: "10px" }}>{error}</p>
      )}

      <select onChange={(e) => setOption(e.target.value)}>
        <option value="HealthCheck">Health check</option>
        <option value="OccupationalHealthcare">Occupational healthcare</option>
        <option value="Hospital">Hospital</option>
      </select>

      <button onClick={() => setModalOpen(true)}>Select</button>

      {modalOpen && (
        <NewEntryForm
          id={id}
          option={option}
          patient={patient}
          setPatient={setPatient}
          error={error}
          setError={setError}
          setModalOpen={setModalOpen}
        />
      )}

      <h3>Entries</h3>
      {patient?.entries.map((entry, i) => (
        <PatientEntry key={i} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
