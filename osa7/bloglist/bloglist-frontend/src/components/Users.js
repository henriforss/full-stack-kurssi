import { useSelector } from "react-redux";

const Users = () => {
  /* Access redux state to get array with all users. */
  const users = useSelector((state) => state.users);

  let sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {sortedUsers.map((user, i) => {
            return (
              <tr key={i}>
                <td>
                  <a href={`/users/${user.id}`}>{user.name}</a>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
