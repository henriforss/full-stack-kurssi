import { connect } from "react-redux"

const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (props.notification !== "") {
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}


export default connect(
  mapStateToProps,
)(Notification)