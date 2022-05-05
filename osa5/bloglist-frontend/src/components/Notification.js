/* Render notification. */
const Notification = (props) => {
  if (props.notificationMessage === null) {
    return null
  } else {
    return (
      <div className={props.notificationStyle}>
        {props.notificationMessage}
      </div>
    )
  }
}

export default Notification