/* Component to Toggle visible. */
import { useState, useImperativeHandle, forwardRef } from "react";

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
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button id="newblog-button" onClick={toggleVisibility}>
          {props.buttonlabel}
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
