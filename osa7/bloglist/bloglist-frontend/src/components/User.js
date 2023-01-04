import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  /* Get params from React Router. */
  const params = useParams();
  const id = params.id;

  /* Access state to get users. */
  const users = useSelector((state) => state.users);

  /* Find correct user. */
  const selectedUser = users.find((user) => user.id === id);

  if (!selectedUser) {
    return null;
  } else {
    return (
      <div>
        <h2>{selectedUser.name}</h2>
        <h3>Added blogs:</h3>
        <ul>
          {selectedUser.blogs.map((blog, i) => {
            return (
              <li key={i}>
                <a href={`/blogs/${blog._id}`}>{blog.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default User;
