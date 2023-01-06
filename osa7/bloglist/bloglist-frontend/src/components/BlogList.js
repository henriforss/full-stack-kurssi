import { useRef } from "react";
import { useSelector } from "react-redux";
import Togglable from "./Togglable";
import CreateNewForm from "./CreateNewForm";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = () => {
  /* Access state. */
  const blogs = useSelector((state) => state.blog);

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

        <Table striped>
          <tbody>
            {sorted.map((blog, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link to={`/blogs/${blog._id}`}>
                      {blog.title} by {blog.author}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default BlogList;
