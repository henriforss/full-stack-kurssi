import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  console.log(id);
  console.log(patient);

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
    </div>
  );
};

export default PatientPage;
