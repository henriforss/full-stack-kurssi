import { useRef } from "react";
import { useSelector } from "react-redux";
import Togglable from "./Togglable";
import CreateNewForm from "./CreateNewForm";

const BlogList = () => {
  /* Access state. */
  const blogs = useSelector((state) => state.blog);

  const fullState = useSelector((state) => state);
  console.log(fullState);

  /* useRef() to grab Togglable element. */
  const createNewFormRef = useRef();

  /* Copy state to a new array and sort it. */
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes);

  if (!sorted) {
    return null;
  } else {
    return (
      <div>
        <div>
          <Togglable buttonlabel="Create new blog" ref={createNewFormRef}>
            <h2>Create new</h2>
            <CreateNewForm createNewFormRef={createNewFormRef} />
          </Togglable>
        </div>

        <div>
          {sorted.map((blog, i) => {
            return (
              <div key={i}>
                <a href={`/blogs/${blog._id}`}>
                  {blog.title} by {blog.author}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default BlogList;
