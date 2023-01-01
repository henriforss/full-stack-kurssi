import { useSelector } from "react-redux";

/* Render notification. */
const Notification = () => {
  const notificationStyle = useSelector((state) => state.notification.style);
  const notificationMessage = useSelector((state) => state.notification.value);

  if (notificationMessage === null) {
    return null;
  } else {
    return <div className={notificationStyle}>{notificationMessage}</div>;
  }
};

export default Notification;
