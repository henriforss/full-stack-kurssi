import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  /* Access state. */
  const blogs = useSelector((state) => state.blog);

  /* Copy state to a new array and sort it. */
  const items = [...blogs];
  const sorted = items.sort((a, b) => b.likes - a.likes);

  console.log(blogs);

  return (
    <div id="list-blogs">
      {sorted.map((blog) => (
        <Blog key={blog._id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
