import { useEffect, useState } from "react";
import { Diagnose, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import PatientEntry from "../PatientEntry";

interface Props {
  diagnoses: Diagnose[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

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

      {/* TODO: the rest */}

      <h3>Entries</h3>
      {patient?.entries.map((entry, i) => (
        <PatientEntry key={i} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
