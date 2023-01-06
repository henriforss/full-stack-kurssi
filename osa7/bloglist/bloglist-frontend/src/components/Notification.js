import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

/* Render notification. */
const Notification = () => {
  const notificationStyle = useSelector((state) => state.notification.style);
  const notificationMessage = useSelector((state) => state.notification.value);

  if (notificationMessage === null) {
    return null;
  } else {
    return (
      <Alert className={`alert alert-${notificationStyle}`}>
        {notificationMessage}
      </Alert>
    );
  }
};

export default Notification;
