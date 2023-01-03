import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  /* Access state. */
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  /* Copy state to a new array and sort it. */
  const items = [...blogs];
  const sorted = items.sort((a, b) => b.likes - a.likes);

  console.log(blogs);
  console.log(user);

  return (
    <div id="list-blogs">
      {sorted.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
