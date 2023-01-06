/* Component to Toggle visible. */
import { useState, useImperativeHandle, forwardRef } from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, ref) => {
  const [createNewVisible, setCreateNewVisible] = useState(false);

  const showWhenVisible = { display: createNewVisible ? "" : "none" };
  const hideWhenVisible = { display: createNewVisible ? "none" : "" };

  const toggleVisibility = () => {
    setCreateNewVisible(!createNewVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
      <div style={hideWhenVisible}>
        <Button id="newblog-button" onClick={toggleVisibility}>
          {props.buttonlabel}
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
